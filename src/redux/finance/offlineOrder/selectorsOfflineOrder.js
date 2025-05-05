// src/redux/finance/offlineOrder/selectorsOfflineOrder.js
import { createSelector } from "reselect";

const selectOfflineOrdersState = (state) => state.offlineOrders || {};

export const selectOfflineOrders = createSelector(
  [selectOfflineOrdersState],
  (offlineOrders) => offlineOrders.offlineOrders || []
);
export const selectOfflineOrdersLoading = createSelector(
  [selectOfflineOrdersState],
  (offlineOrders) => offlineOrders.loading || false
);
export const selectOfflineOrdersError = createSelector(
  [selectOfflineOrdersState],
  (offlineOrders) => offlineOrders.error || null
);
