import { createSelector } from "reselect";

const selectOfflineSalesState = (state) => state.offlineSales || {};

export const selectOfflineSales = createSelector(
  [selectOfflineSalesState],
  (offlineSales) => offlineSales.offlineSales || []
);
export const selectOfflineSalesLoading = createSelector(
  [selectOfflineSalesState],
  (offlineSales) => offlineSales.loading || false
);
export const selectOfflineSalesError = createSelector(
  [selectOfflineSalesState],
  (offlineSales) => offlineSales.error || null
);
