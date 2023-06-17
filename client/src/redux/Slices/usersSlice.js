import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api";

export const getAllUsers = createAsyncThunk("getUsers", async () => {
  const { data } = await api.getAllUsers();
  return data;
});

export const updateProfile = createAsyncThunk(
  "updateprofile",
  async ({ id, name, about, tags }, { dispatch }) => {
    const { data } = await api.updateProfile(id, name, about, tags);
    dispatch(getAllUsers());
    // return data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    Users: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.Users = action.payload;
    });
    // .addCase(updateProfile.fulfilled, (state, action) => {
    //   state.Users.map((user) =>
    //     user._id === action.payload._id ? action.payload : user
    //   );
    // });
  },
});

export const { fetchAllUsers } = usersSlice.actions;
export default usersSlice.reducer;
