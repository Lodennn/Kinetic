import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDays } from "../../services/api";

const initialState = {
    isLoading: true,
    data: {},
    error: null
}

export const getDaysAction = createAsyncThunk('', async (programId, thunkAPI) => {
    try {
        return await getDays(programId);
    } catch(error) {
        console.log('error: ', error);
    }
});

const daysSlice = createSlice({
    name: 'days',
    initialState,
    extraReducers: {
        [getDaysAction.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getDaysAction.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        [getDaysAction.rejected]: (state, action) => {
            state.error = action.error
        },
    }
})

export default daysSlice.reducer;