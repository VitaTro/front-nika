import { createSelector } from "reselect";

const selectUserOrdersState = (state) => state.userOrders || {};

export const selectUserOrders = createSelector(
  [selectUserOrdersState],
  (orders) => orders.orders || [],
);

export const selectUserOrdersLoading = createSelector(
  [selectUserOrdersState],
  (orders) => orders.loading || false,
);

export const selectUserOrdersError = createSelector(
  [selectUserOrdersState],
  (orders) => orders.error || null,
);

export const selectPurchaseHistory = createSelector(
  [selectUserOrdersState],
  (orders) =>
    Array.isArray(orders.purchaseHistory) ? orders.purchaseHistory : [],
);

export const selectPickupPoints = createSelector(
  [selectUserOrdersState],
  (orders) => orders.pickupPoints || [],
);

export const selectCurrentUserOrder = createSelector(
  [selectUserOrdersState],
  (orders) => orders.currentOrder || null,
);
