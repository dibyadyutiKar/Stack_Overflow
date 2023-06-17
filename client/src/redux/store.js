import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import questionReducer from "./Slices/questionSlice";
import usersReducer from "./Slices/usersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    question: questionReducer,
    users: usersReducer,
  },
});

export default store;
