import { createSelector } from "reselect";

const selectFinanceState = (state) => state.overview || {};

export const selectFinanceStats = createSelector(
  [selectFinanceState],
  (finance) => finance.stats || {}
);

export const selectCompletedSales = createSelector(
  [selectFinanceState],
  (finance) => finance.completedSales || []
);

export const selectLowStockItems = createSelector(
  [selectFinanceState],
  (finance) => finance.lowStockItems || []
);

export const selectSalesOverview = createSelector(
  [selectFinanceState],
  (finance) => finance.salesOverview || {}
);

export const selectFinanceSettings = createSelector(
  [selectFinanceState],
  (finance) => finance.financeSettings || {}
);

export const selectFinanceLoading = createSelector(
  [selectFinanceState],
  (finance) => finance.loading || false
);

export const selectFinanceError = createSelector(
  [selectFinanceState],
  (finance) => finance.error || null
);
