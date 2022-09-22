import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Firestore } from "firebase/firestore";
import db from "../../config/database";
import { workouts } from "../../data/workouts";
import {
  deleteDocument,
  getCollection,
  getWorkouts,
  postDocument,
  updateDocumentField,
} from "../../services/api";
import { timestampToDate } from "../../services/dates";
import { filterWorkotusByDate } from "../../services/workouts";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
  workouts: [],
  filteredWorkouts: [],
  addWorkoutForm: { form: null, isFormSetted: false },
};

//prettier-ignore
export const addWorkoutAction = createAsyncThunk("workouts/addWorkout", async (data, {dispatch, getState}) => {
    try {
    await postDocument(data).then(data => dispatch(workoutsActions.setWorkouts(data)));
    } catch (error) {
      console.error(error);
    }
  }
);

//prettier-ignore
export const deleteWorkoutAction = createAsyncThunk('workouts/deleteWorkout', async (data, {dispatch, getState}) => {
  try {
    await deleteDocument({collectionName: 'workouts', documentId: data.documentId})
          .then(_ => dispatch(workoutsActions.deleteWorkout(data.documentId)))
  } catch(error) {
    console.error(error);
  }
})

export const getWorkoutsAction = createAsyncThunk(
  "workouts/getWorkouts",
  async (payload, thunkAPI) => {
    try {
      const { programId, dayId, userId } = payload;
      const workouts = await getWorkouts(programId, dayId, userId);

      return workouts.map((workout) => ({
        ...workout,
        createdAt: timestampToDate(workout.createdAt),
      }));
    } catch (err) {
      console.error(err);
    }
  }
);

export const addNoteToWorkoutAction = createAsyncThunk(
  "workouts/addNoteToWorkout",
  async (payload, { getState, dispatch }) => {
    try {
      const appropriatePayload = {
        collection: "workouts",
        docId: payload.workoutId,
        updatedField: "hasNote",
        updatedFieldValue: true,
      };
      await updateDocumentField(appropriatePayload).then((data) => {
        dispatch(
          workoutsActions.addNoteToWorkout({ workoutId: payload.workoutId })
        );
      });
    } catch (err) {
      console.error(err);
    }
  }
);

const workoutsSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    setAddWorkoutForm: (state, action) => {
      state.addWorkoutForm = { form: action.payload, isFormSetted: true };
    },
    setWorkouts: (state, action) => {
      state.workouts.unshift(action.payload);
    },
    addNoteToWorkout: (state, action) => {
      const updatedWorkoutIndex = state.workouts.findIndex(
        (workout) => workout.id === action.payload.workoutId
      );
      const updatedWorkout = state.workouts.find(
        (workout) => workout.id === action.payload.workoutId
      );
      state.workouts[updatedWorkoutIndex] = {
        ...updatedWorkout,
        hasNote: true,
      };
    },
    deleteWorkout: (state, action) => {
      state.workouts = state.workouts.filter(
        (workout) => workout.id !== action.payload
      );
    },
  },
  extraReducers: {
    [getWorkoutsAction.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getWorkoutsAction.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.workouts = action.payload;
    },
    [getWorkoutsAction.rejected]: (state, action) => {
      state.error = action.error;
    },
    [addWorkoutAction.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addWorkoutAction.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [addWorkoutAction.rejected]: (state, action) => {
      state.error = action.error;
    },
    [addNoteToWorkoutAction.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addNoteToWorkoutAction.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [addNoteToWorkoutAction.rejected]: (state, action) => {
      state.error = action.error;
    },
    [deleteWorkoutAction.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteWorkoutAction.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [deleteWorkoutAction.rejected]: (state, action) => {
      state.error = action.error;
    },
  },
});

export const workoutsActions = workoutsSlice.actions;

export default workoutsSlice.reducer;
