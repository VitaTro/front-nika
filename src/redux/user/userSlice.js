import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMainData,
  fetchPurchaseHistory,
  fetchUserProfile,
  updateUserPreferences,
  updateUserProfile,
  uploadUserAvatar,
} from "./userOperations";

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    preferences: [],
    avatar: null,
    purchaseHistory: [],
    loading: false,
    error: null,
  },
  reducers: {}, // Додайте потрібні синхронні редюсери, якщо необхідно
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.profile = payload;
      })
      .addCase(fetchUserProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        state.profile = payload;
      })
      .addCase(fetchMainData.fulfilled, (state, { payload }) => {
        state.profile = payload.user;
        state.preferences = payload.user.preferences;
      })
      .addCase(uploadUserAvatar.fulfilled, (state, { payload }) => {
        state.avatar = payload.avatar;
      })

      .addCase(fetchPurchaseHistory.fulfilled, (state, { payload }) => {
        state.purchaseHistory = payload;
      })
      .addCase(updateUserPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserPreferences.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.preferences = payload; // Оновлюємо уподобання
      })
      .addCase(updateUserPreferences.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default userSlice.reducer;
