import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Firestore } from "firebase/firestore";
import db from "../../config/database";
import { workouts } from "../../data/workouts";
import {
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

export const getWorkoutsAction = createAsyncThunk(
  "workouts/getWorkouts",
  async (payload, thunkAPI) => {
    try {
      const { programId, dayId } = payload;
      const workouts = await getWorkouts(programId, dayId);

      return workouts.map((workout) => ({
        ...workout,
        createdAt: timestampToDate(workout.createdAt),
      }));
    } catch (err) {
      console.error(err);
    }
  }
);

export const updateWorkoutAction = createAsyncThunk(
  "workouts/updateWorkout",
  async (payload, { getState, dispatch }) => {
    try {
      const appropriatePayload = {
        collection: "workouts",
        docId: payload.workoutId,
        updatedField: "hasNote",
        updatedFieldValue: true,
      };
      await updateDocumentField(appropriatePayload).then((data) => {
        console.log("workouts-slice data: ", data);
        dispatch(
          workoutsActions.updateWorkout({ workoutId: payload.workoutId })
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
    setWorkouts: (state, action) => {
      state.workouts.unshift(action.payload);
    },
    updateWorkout: (state, action) => {
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
  },
});

export const workoutsActions = workoutsSlice.actions;

export default workoutsSlice.reducer;
