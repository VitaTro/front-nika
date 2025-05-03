import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFinanceSettings,
  updateFinanceSettings,
} from "./operationSettings";

const financeSettingsSlice = createSlice({
  name: "financeSettings",
  initialState: {
    settings: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFinanceSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFinanceSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(fetchFinanceSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateFinanceSettings.fulfilled, (state, action) => {
        state.settings = action.payload;
      });
  },
});

export default financeSettingsSlice.reducer;
