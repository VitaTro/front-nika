import { createSelector } from "reselect";

// Базовий селектор для стану офлайн-замовлень
const selectOfflineOrdersState = (state) => state.offlineOrders || {};

// Мемоїзовані селектори
export const selectOfflineOrders = createSelector(
  [selectOfflineOrdersState],
  (offlineOrders) => offlineOrders.orders || []
);

export const selectOfflineOrdersLoading = createSelector(
  [selectOfflineOrdersState],
  (offlineOrders) => offlineOrders.isLoading || false
);

export const selectOfflineOrdersError = createSelector(
  [selectOfflineOrdersState],
  (offlineOrders) => offlineOrders.error || null
);
