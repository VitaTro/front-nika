import { createSelector } from "reselect";

const selectOfflineSalesState = (state) => state.offlineSales || {};

export const selectOfflineSales = createSelector(
  [selectOfflineSalesState],
  (offlineSales) => offlineSales.sales || []
);
export const selectOfflineSalesLoading = createSelector(
  [selectOfflineSalesState],
  (offlineSales) => offlineSales.isLoading || false
);

export const selectOfflineSalesError = createSelector(
  [selectOfflineSalesState],
  (offlineSales) => offlineSales.error || null
);
