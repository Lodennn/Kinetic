import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userSignup } from "../../services/api";

const initialState = {
  token: null,
  isLoggedIn: false,
  user: null,
  isLoading: false,
};

export const userLoginAction = createAsyncThunk(
  "auth/login",
  async (_, thunkAPI) => {}
);

export const userSignupAction = createAsyncThunk(
  "auth/signup",
  async (payload, { getState, dispatch }) => {
    const idealSignupPostData = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    };
    try {
      await userSignup(idealSignupPostData).then((data) => {
        dispatch(authActions.userSignup(data));
      });
    } catch (err) {
      console.error(err);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      console.log("user login reducer");
    },
    userSignup: (state, action) => {
      state.token = action.payload.idToken;
      state.isLoggedIn = !!action.payload.idToken;
    },
  },
  extraReducers: {
    [userLoginAction.pending]: (state, action) => {
      console.log("user login action PENDING");
    },

    [userLoginAction.fulfilled]: (state, action) => {
      console.log("user login action FULFILLED");
    },

    [userLoginAction.rejected]: (state, action) => {
      console.log("user login action REJECTED");
    },

    [userSignupAction.pending]: (state, action) => {
      console.log("user login action PENDING");
      state.isLoading = true;
    },

    [userSignupAction.fulfilled]: (state, action) => {
      console.log("user login action FULFILLED: ", action);
      state.isLoading = false;
    },

    [userSignupAction.rejected]: (state, action) => {
      console.log("user login action REJECTED: ", action);
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
