import { createSelector } from "reselect";

// Базовий селектор для фінансів
const selectFinanceState = (state) => state.finance || {};

export const selectFinanceOverview = createSelector(
  [selectFinanceState],
  (finance) => finance.overview || {} // Повертає те ж саме, але мемоїзовано
);

export const selectFinanceLoading = createSelector(
  [selectFinanceState],
  (finance) => finance.loading || false
);

export const selectFinanceError = createSelector(
  [selectFinanceState],
  (finance) => finance.error || null
);
