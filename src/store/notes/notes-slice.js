import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteDocument,
  postDocument,
  updateDocument,
} from "../../services/api";
import { addNoteToWorkoutAction } from "../workouts/workouts-slice";

export const addNoteAction = createAsyncThunk(
  "notes/addNote",
  async (payload, { getState, dispatch }) => {
    try {
      await postDocument({ collection: "notes", postData: payload }).then(
        (data) => {
          dispatch(
            addNoteToWorkoutAction({
              updatedData: { hasNote: true, noteId: data.id },
              workoutId: data.workoutId,
              action: "add",
            })
          );
        }
      );
    } catch (err) {
      console.error(err);
    }
  }
);
export const updateNoteAction = createAsyncThunk(
  "notes/updateNote",
  async (payload, { getState, dispatch }) => {
    try {
      await updateDocument(
        { note: payload.note },
        { collectionName: "notes", documentId: payload.noteId }
      ).then((data) => {
        dispatch(
          addNoteToWorkoutAction({
            updatedData: { hasNote: true, noteId: payload.noteId },
            workoutId: payload.workoutId,
            action: "update",
          })
        );
      });
    } catch (err) {
      console.error(err);
    }
  }
);
export const deleteNoteAction = createAsyncThunk(
  "notes/deleteNote",
  async (payload, { getState, dispatch }) => {
    try {
      console.log("payload deleteNoteAction: ", payload);
      await deleteDocument({
        collectionName: "notes",
        documentId: payload.noteId,
      }).then((_) => {
        dispatch(
          addNoteToWorkoutAction({
            updatedData: { hasNote: false, noteId: payload.noteId },
            workoutId: payload.workoutId,
            action: "delete",
          })
        );
      });
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
    [deleteNoteAction.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteNoteAction.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [deleteNoteAction.rejected]: (state, action) => {},
  },
});

export const noteActions = notesSlice.actions;

export default notesSlice.reducer;
