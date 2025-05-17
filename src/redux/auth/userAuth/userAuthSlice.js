import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  verifyEmail,
} from "./operationAuth";

const userAuthReducer = createSlice({
  name: "userAuth",
  initialState: {
    isLoggedIn: false,
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    isEmailVerified: false,
  },
  reducers: {}, // Основні редюсери, якщо необхідно
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
      })

      .addCase(logoutUser.fulfilled, (state) => {
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
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isEmailVerified = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default userAuthReducer.reducer;
