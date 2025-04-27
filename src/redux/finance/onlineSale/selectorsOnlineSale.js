import { createSelector } from "reselect";

const selectOnlineSalesState = (state) => state.onlineSales || {};

export const selectOnlineSales = createSelector(
  [selectOnlineSalesState],
  (onlineSales) => onlineSales.sales || []
);
export const selectOnlineSalesLoading = createSelector(
  [selectOnlineSalesState],
  (onlineSales) => onlineSales.isLoading || false
);

export const selectOnlineSalesError = createSelector(
  [selectOnlineSalesState],
  (onlineSales) => onlineSales.error || null
);
