import { createSelector } from "reselect";

const selectPlatformSlice = (state) => state.platform;

export const selectPlatformOrders = createSelector(
  [selectPlatformSlice],
  (slice) => slice.orders
);

export const selectPlatformSales = createSelector(
  [selectPlatformSlice],
  (slice) => slice.sales
);
export const selectPlatformLoadingOrders = createSelector(
  [selectPlatformSlice],
  (slice) => slice.loadingOrders
);

export const selectPlatformErrorOrders = createSelector(
  [selectPlatformSlice],
  (slice) => slice.errorOrders
);
