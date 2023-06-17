import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import setAuthHeader from "../../utils/setAuthHeader";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!localStorage.getItem("token"),
    user: {
      name: null,
      id: null,
      token: null,
    },
  },
  reducers: {
    authSuccess: (state, action) => {
      const { token } = action.payload;
      localStorage.setItem("Profile", token);
      state.isAuthenticated = true;
      setAuthHeader(token);
      const decodedToken = jwt_decode(token);
      state.user.name = decodedToken.username;
      state.user.id = decodedToken.id;
      state.user.token = token;
    },
    logoutSuccess: (state) => {
      localStorage.removeItem("Profile");
      state.isAuthenticated = false;
      state.user.name = null;
      state.user.id = null;
      state.user.token = null;
      setAuthHeader();
    },
  },
});

export const { authSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
