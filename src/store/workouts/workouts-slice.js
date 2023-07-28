import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Firestore } from "firebase/firestore";
import db from "../../config/database";
import { workouts } from "../../data/workouts";
import {
  deleteDocument,
  getCollection,
  getWorkouts,
  postDocument,
  updateDocument,
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
export const updateWorkoutAction = createAsyncThunk('workouts/updateWorkout', async (data, {dispatch, getState}) => {
  try {
    await updateDocument(data, {collectionName: 'workouts', documentId: data.id}).then(returnedData => {
      dispatch(workoutsActions.updateWorkout(data));
    });
  } catch(err) {
    console.error(err);
  }
});

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
      await updateDocument(payload.updatedData, {
        collectionName: "workouts",
        documentId: payload.workoutId,
      })
        .then((_) => {
          if (payload.action === "add") {
            dispatch(
              workoutsActions.addNoteToWorkout({
                workoutId: payload.workoutId,
                noteId: payload.updatedData.noteId,
                addNote: true,
              })
            );
          }
          if (payload.action === "update") {
          }
          if (payload.action === "delete") {
            updateDocumentField({
              collection: "workouts",
              docId: payload.workoutId,
              updatedField: "noteId",
              updatedFieldValue: null,
            })
              .then((_) => {
                dispatch(
                  workoutsActions.addNoteToWorkout({
                    workoutId: payload.workoutId,
                    noteId: payload.updatedData.noteId,
                    addNote: false,
                  })
                );
              })
              .catch((err) => console.log("err UPDATING: ", err));
          }
        })
        .catch((err) => console.error("addNoteToWorkout - ERROR: ", err));
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
        noteId: action.payload.noteId,
        hasNote: action.payload.addNote,
      };
    },
    updateWorkout: (state, action) => {
      const updatedWorkoutIndex = state.workouts.findIndex(
        (workout) => workout.id === action.payload.id
      );

      state.workouts[updatedWorkoutIndex] = action.payload;
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
    [updateWorkoutAction.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateWorkoutAction.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [updateWorkoutAction.rejected]: (state, action) => {
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
