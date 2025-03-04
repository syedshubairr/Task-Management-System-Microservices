import { createSlice } from "@reduxjs/toolkit";
import {
  getUserProfile,
  getUsersList,
  login,
  logout,
  register,
} from "../../services/AuthService";
import { userInitialState } from "../types";

const initialState: userInitialState = {
  user: null,
  loggedIn: false,
  loading: false,
  error: null,
  jwt: null,
  users: [],
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state: userInitialState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state: userInitialState, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.loggedIn = true;
      })
      .addCase(login.rejected, (state: userInitialState, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.loggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.loggedIn = true;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getUsersList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersList.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.loggedIn = true;
      })
      .addCase(getUsersList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loggedIn = false;
        state.loading = false;
        state.error = null;
        state.jwt = null;
        state.users = [];
      });
  },
});

export default authSlice.reducer;
