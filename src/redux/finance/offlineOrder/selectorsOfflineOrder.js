export const selectOfflineOrders = (state) => state.offlineOrders.orders;
export const selectOfflineOrdersLoading = (state) =>
  state.offlineOrders.isLoading;
export const selectOfflineOrdersError = (state) => state.offlineOrders.error;
