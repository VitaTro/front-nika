import { createSelector } from "reselect";

const selectOnlineSalesState = (state) => state.onlineSales || {};

export const selectOnlineSales = createSelector(
  [selectOnlineSalesState],
  (onlineSales) => onlineSales.onlineSales || []
);
export const selectOnlineSalesLoading = createSelector(
  [selectOnlineSalesState],
  (onlineSales) => onlineSales.loading || false
);
export const selectOnlineSalesError = createSelector(
  [selectOnlineSalesState],
  (onlineSales) => onlineSales.error || null
);
