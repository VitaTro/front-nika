import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMonthlyReportByMonth,
  fetchMonthlyReports,
  generateMonthlyReport,
} from "./operationsMonthlyReport";

const initialState = {
  reports: [],
  selectedReport: null,
  loading: false,
  generating: false,
  error: null,
  success: null,
};

const monthlyReportSlice = createSlice({
  name: "monthlyReport",
  initialState,
  reducers: {
    resetMonthlyStatus: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthlyReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMonthlyReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchMonthlyReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchMonthlyReportByMonth.pending, (state) => {
        state.loading = true;
        state.selectedReport = null;
      })
      .addCase(fetchMonthlyReportByMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedReport = action.payload;
      })
      .addCase(fetchMonthlyReportByMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(generateMonthlyReport.pending, (state) => {
        state.generating = true;
        state.success = null;
      })
      .addCase(generateMonthlyReport.fulfilled, (state, action) => {
        state.generating = false;
        state.success = action.payload.message || "Звіт згенеровано";
      })
      .addCase(generateMonthlyReport.rejected, (state, action) => {
        state.generating = false;
        state.error = action.payload;
      });
  },
});

export const { resetMonthlyStatus } = monthlyReportSlice.actions;
export default monthlyReportSlice.reducer;
