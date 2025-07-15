import { createSelector } from "reselect";

const selectOfflineSalesState = (state) => state.offlineSales || {};

export const selectOfflineSales = createSelector(
  [selectOfflineSalesState],
  (offlineSales) => offlineSales.offlineSales || []
);
export const selectOfflineSalesLoading = (state) => state.offlineSales.loading;

export const selectOfflineSalesError = createSelector(
  [selectOfflineSalesState],
  (offlineSales) => offlineSales.error || null
);
