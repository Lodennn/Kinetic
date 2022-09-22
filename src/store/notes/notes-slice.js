import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postDocument } from "../../services/api";
import { addNoteToWorkoutAction } from "../workouts/workouts-slice";

export const addNoteAction = createAsyncThunk(
  "notes/addNote",
  async (payload, { getState, dispatch }) => {
    try {
      await postDocument({ collection: "notes", postData: payload }).then(
        (data) => {
          dispatch(addNoteToWorkoutAction(data));
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
      state.isLoading = true;
    },
    [addNoteAction.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [addNoteAction.rejected]: (state, action) => {},
  },
});

export const noteActions = notesSlice.actions;

export default notesSlice.reducer;
