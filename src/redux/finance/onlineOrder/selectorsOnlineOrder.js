import { createSelector } from "reselect";

// Базовий селектор для стану офлайн-замовлень
const selectOnlineOrdersState = (state) => state.onlineOrders || {};

// Мемоїзовані селектори
export const selectOnlineOrders = createSelector(
  [selectOnlineOrdersState],
  (onlineOrders) => onlineOrders.orders || []
);

export const selectOnlineOrdersLoading = createSelector(
  [selectOnlineOrdersState],
  (onlineOrders) => onlineOrders.isLoading || false
);

export const selectOnlineOrdersError = createSelector(
  [selectOnlineOrdersState],
  (onlineOrders) => onlineOrders.error || null
);
export const selectCurrentOnlineOrder = createSelector(
  [selectOnlineOrdersState],
  (onlineOrders) => onlineOrders.currentOrder || {}
);
