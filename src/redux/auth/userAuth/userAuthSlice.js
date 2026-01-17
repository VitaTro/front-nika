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
    accessToken: localStorage.getItem("accessToken") || null,
    loading: false,
    error: null,
    isEmailVerified: false,
  },
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isEmailVerified = action.payload.user.isVerified;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
  }, // Основні редюсери, якщо необхідно
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isEmailVerified = action.payload.user.isVerified;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
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
        state.accessToken = null;
        localStorage.removeItem("accessToken"); // 🔹 Видаляємо токен із пам’яті
        localStorage.removeItem("refreshToken"); // 🔹 Видаляємо refreshToken
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
export const { loginSuccess } = userAuthReducer.actions;
export default userAuthReducer.reducer;
