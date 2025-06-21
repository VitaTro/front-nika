import { createSlice } from "@reduxjs/toolkit";
import {
  createFinanceOverview,
  fetchFinanceOverview,
  updateFinanceOverview,
} from "./operationOverview";

const overviewSlice = createSlice({
  name: "overview",
  initialState: {
    stats: {},
    completedSales: [],
    lowStockItems: [],
    salesOverview: {},
    financeSettings: {},
    expenses: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFinanceOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFinanceOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.completedSales = action.payload.completedSales;
        state.lowStockItems = action.payload.lowStockItems;
        state.salesOverview = action.payload.salesOverview;
        state.financeSettings = action.payload.financeSettings;
        state.expenses = action.payload.expenses || {};
      })
      .addCase(fetchFinanceOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createFinanceOverview.fulfilled, (state, action) => {
        Object.assign(state.financeSettings, action.payload.financeSettings);
      })
      .addCase(updateFinanceOverview.fulfilled, (state, action) => {
        Object.assign(state.financeSettings, action.payload.financeSettings);
      });
  },
});

export default overviewSlice.reducer;
