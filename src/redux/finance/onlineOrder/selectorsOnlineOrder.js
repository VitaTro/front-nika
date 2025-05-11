import { createSelector } from "reselect";

const selectOnlineOrdersState = (state) => state.onlineOrders || {};

export const selectOnlineOrders = createSelector(
  [selectOnlineOrdersState],
  (onlineOrders) => onlineOrders.onlineOrders || []
);
export const selectOnlineOrdersLoading = createSelector(
  [selectOnlineOrdersState],
  (onlineOrders) => onlineOrders.loading || false
);
export const selectOnlineOrdersError = createSelector(
  [selectOnlineOrdersState],
  (onlineOrders) => onlineOrders.error || null
);
