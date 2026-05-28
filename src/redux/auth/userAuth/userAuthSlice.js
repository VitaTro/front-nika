import { createSlice } from "@reduxjs/toolkit";
import {
  checkUserSession,
  loginUser,
  logoutUser,
  // refreshUserSession,
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
    // accessToken: localStorage.getItem("accessToken") || null,
    loading: false,
    error: null,
    isEmailVerified: false,
  },
  reducers: {
    // loginSuccess(state, action) {
    //   state.isLoggedIn = true;
    //   state.user = action.payload.user;
    //   state.accessToken = action.payload.accessToken;
    //   state.isEmailVerified = action.payload.user.isVerified;
    // localStorage.setItem("accessToken", action.payload.accessToken);
    // localStorage.setItem("refreshToken", action.payload.refreshToken);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        // state.accessToken = action.payload.accessToken;
        state.isEmailVerified = action.payload.isVerified;
        // localStorage.setItem("accessToken", action.payload.accessToken);
        // localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        // state.accessToken = null;
        // localStorage.removeItem("accessToken"); // 🔹 Видаляємо токен із пам’яті
        // localStorage.removeItem("refreshToken"); // 🔹 Видаляємо refreshToken
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
      })
      // .addCase(refreshUserSession.fulfilled, (state, action) => {
      //   state.accessToken = action.payload.accessToken;
      //   state.user = action.payload.user;
      //   state.isUserAuthenticated = true;
      //   localStorage.setItem("accessToken", action.payload.accessToken);
      // })
      // .addCase(refreshUserSession.rejected, (state) => {
      //   state.isUserAuthenticated = false;
      //   state.user = null;
      //   state.accessToken = null;
      //   localStorage.removeItem("accessToken");
      //   localStorage.removeItem("refreshToken");
      // });
      .addCase(checkUserSession.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isUser;
        state.user = action.payload.user || null;
      })
      .addCase(checkUserSession.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export default userAuthReducer.reducer;
