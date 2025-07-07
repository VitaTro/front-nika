export const selectMonthlyReports = (state) =>
  state.inventory.monthlyReport.reports;
export const selectSelectedReport = (state) =>
  state.inventory.monthlyReport.selectedReport;
export const selectMonthlyLoading = (state) =>
  state.inventory.monthlyReport.loading;
export const selectMonthlyGenerating = (state) =>
  state.inventory.monthlyReport.generating;
export const selectMonthlyError = (state) =>
  state.inventory.monthlyReport.error;
export const selectMonthlySuccess = (state) =>
  state.inventory.monthlyReport.success;
