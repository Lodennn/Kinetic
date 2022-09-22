import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLogin, userSignup } from "../../services/api";
import {
  getLocalStoragae,
  removeLocalStorageItem,
  setLocalStorage,
} from "../../services/storage";

const user = getLocalStoragae("user");

const initialState = {
  token: !!user ? user.token : null,
  isLoggedIn: !!user ? true : false,
  user: user,
  isLoading: false,
  data: null,
};

export const userSignupAction = createAsyncThunk(
  "auth/signup",
  async (payload, { dispatch }) => {
    try {
      await userSignup(payload).then((data) => {
        const userData = {
          id: data.id,
          email: payload.email,
          username: payload.username,
          age: payload.age,
          token: data.token,
        };

        dispatch(authActions.userSignup(userData));
        if (!!!data.error) setLocalStorage("user", userData);
      });
    } catch (err) {
      console.error(err);
    }
  }
);

export const userLoginAction = createAsyncThunk(
  "auth/login",
  async (payload, { dispatch }) => {
    try {
      const response = await userLogin(payload).then((data) => {
        if (!!!data.error) {
          dispatch(authActions.userLogin(data));
          setLocalStorage("user", data);
        }
        return data;
      });

      return response;
    } catch (err) {
      console.error("LOGIN error: ", err);
    }
  }
);

export const userLogoutAction = createAsyncThunk(
  "auth/login",
  async (_, { dispatch }) => {
    removeLocalStorageItem("user");
    dispatch(authActions.userLogout());
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userSignup: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = !!action.payload.token;
      state.user = action.payload;
    },
    userLogin: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = !!action.payload.token;
      state.user = action.payload;
    },
    userLogout: (state, action) => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [userLoginAction.pending]: (state, action) => {
      state.isLoading = true;
    },

    [userLoginAction.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },

    [userLoginAction.rejected]: (state, action) => {},

    [userSignupAction.pending]: (state, action) => {
      state.isLoading = true;
    },

    [userSignupAction.fulfilled]: (state, action) => {
      state.isLoading = false;
    },

    [userSignupAction.rejected]: (state, action) => {},
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
