export const selectOrders = (state) => state.orders.orders; // Список замовлень
export const selectCurrentOrder = (state) => state.orders.currentOrder; // Деталі окремого замовлення
export const selectOrdersLoading = (state) => state.orders.loading; // Стан завантаження
export const selectOrdersError = (state) => state.orders.error;
