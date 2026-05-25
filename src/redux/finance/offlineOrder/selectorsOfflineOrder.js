import { createSelector } from "reselect";

const selectOfflineOrdersState = (state) => state.offlineOrders || {};

export const selectOfflineOrders = createSelector(
  [selectOfflineOrdersState],
  (offlineOrders) => offlineOrders.offlineOrders || [],
);
export const selectOfflineOrdersLoading = createSelector(
  [selectOfflineOrdersState],
  (offlineOrders) => offlineOrders.loading || false,
);
export const selectOfflineOrdersError = createSelector(
  [selectOfflineOrdersState],
  (offlineOrders) => offlineOrders.error || null,
);

export const selectOfflineOrderById = (orderId) =>
  createSelector([selectOfflineOrders], (orders) =>
    orders.find((order) => order._id === orderId),
  );
