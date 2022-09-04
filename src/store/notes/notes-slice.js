import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postDocument } from "../../services/api";
import { updateWorkoutAction } from "../workouts/workouts-slice";

export const addNoteAction = createAsyncThunk(
  "notes/addNote",
  async (payload, { getState, dispatch }) => {
    try {
      await postDocument({ collection: "notes", postData: payload }).then(
        (data) => {
          console.log("notes-slice data - ", data);
          dispatch(updateWorkoutAction(data));
        }
      );
    } catch (err) {
      console.error(err);
    }
  }
);

const initialState = {
  isLoading: true,
  data: null,
  error: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  extraReducers: {
    [addNoteAction.pending]: (state, action) => {
      console.log("PENDING: ", action.payload);
    },
    [addNoteAction.fulfilled]: (state, action) => {
      console.log("FULFILLED: ", action.payload);
    },
    [addNoteAction.rejected]: (state, action) => {
      console.log("REJECTED: ", action.payload);
    },
  },
});

export const noteActions = notesSlice.actions;

export default notesSlice.reducer;
