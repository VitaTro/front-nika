export const selectPurchaseHistory = (state) =>
  state.userOrders.purchaseHistory;
export const selectUserOrdersLoading = (state) => state.userOrders.loading;
export const selectUserOrdersError = (state) => state.userOrders.error;
