import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCollection } from "../../services/api";

const initialState = {
  isLoading: true,
  data: {},
  error: null,
};

export const getProgramsAction = createAsyncThunk(
  `programs/getPrograms`,
  async (_, thunkAPI) => {
    try {
      const data = await getCollection("programs");
      return data;
    } catch (error) {}
  }
);

const programsSlice = createSlice({
  name: "programs",
  initialState,
  extraReducers: {
    [getProgramsAction.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getProgramsAction.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [getProgramsAction.rejected]: (state, action) => {
      state.error = action.error;
    },
  },
});

export default programsSlice.reducer;
