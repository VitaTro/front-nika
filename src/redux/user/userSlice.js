import { createSlice } from "@reduxjs/toolkit";
import {
  deleteUserAccount,
  fetchRecentViews,
  fetchUserAddress,
  fetchUserInfo,
  fetchUserMain,
  sendAdminMessage,
  updateUserAddress,
  updateUserInfo,
} from "./userOperations";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    recentViews: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserMain.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(fetchUserAddress.fulfilled, (state, action) => {
        state.user.address = action.payload;
      })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        state.user.address = action.payload;
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      })
      .addCase(sendAdminMessage.fulfilled, (state, action) => {
        console.log("✅ Message sent to admin:", action.payload);
      })
      .addCase(fetchRecentViews.fulfilled, (state, action) => {
        state.recentViews = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export default userSlice.reducer;
