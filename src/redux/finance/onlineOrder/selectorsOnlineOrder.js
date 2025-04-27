export const selectOnlineOrders = (state) => state.onlineOrders.orders; // Список замовлень
export const selectCurrentOnlineOrder = (state) =>
  state.onlineOrders.currentOrder; // Деталі окремого замовлення
export const selectOnlineOrdersLoading = (state) =>
  state.onlineOrders.isLoading; // Стан завантаження
export const selectOnlineOrdersError = (state) => state.onlineOrders.error;
