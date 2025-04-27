import { createSlice } from "@reduxjs/toolkit";
import {
  createFinanceSettings,
  fetchFinanceSettings,
  updateFinanceSettings,
} from "./operationOverview";
const financeSlice = createSlice({
  name: "finance",
  initialState: {
    overview: {
      stats: {},
      salesOverview: {},
      financeSettings: {},
    },
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
        state.overview = action.payload;
      })
      .addCase(fetchFinanceSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createFinanceSettings.fulfilled, (state, action) => {
        state.overview = action.payload; // Оновлюємо overview після створення
      })
      .addCase(updateFinanceSettings.fulfilled, (state, action) => {
        state.overview = { ...state.overview, ...action.payload }; // Мерджимо дані
      });
  },
});
export default financeSlice.reducer;
