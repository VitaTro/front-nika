import { createSlice } from "@reduxjs/toolkit";
import {
  checkAdmin,
  fetchAuthUser,
  login,
  logout,
  refreshToken,
  registerAdmin,
  registerUser,
  resetPassword,
  updatePassword,
} from "./operationAuth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {}, // Основні редюсери, якщо необхідно
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(checkAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAdmin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = { ...state.user, isAdmin: payload.isAdmin };
      })
      .addCase(checkAdmin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
      })
      .addCase(registerAdmin.fulfilled, (state, { payload }) => {
        state.user = payload.admin;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        state.token = payload.token;
      })
      .addCase(fetchAuthUser.fulfilled, (state, { payload }) => {
        state.user = payload;
      });
  },
});

export default authSlice.reducer;
