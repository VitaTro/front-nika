export const selectUserOrders = (state) => state.userOrders.orders;
export const selectUserOrdersLoading = (state) => state.userOrders.loading;
export const selectUserOrdersError = (state) => state.userOrders.error;
export const selectPurchaseHistory = (state) =>
  state.userOrders.purchaseHistory;
export const selectPickupPoints = (state) => state.userOrders.pickupPoints;
