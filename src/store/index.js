import { configureStore } from "@reduxjs/toolkit";
import programsReducer from "./programs/programs-slice";
import daysReducer from "./days/days-slice";
import workoutsReducer from "./workouts/workouts-slice";
import notesReducer from "./notes/notes-slice";
import authReducer from "./auth/auth-slice";

const store = configureStore({
  reducer: {
    programs: programsReducer,
    days: daysReducer,
    workouts: workoutsReducer,
    notes: notesReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
