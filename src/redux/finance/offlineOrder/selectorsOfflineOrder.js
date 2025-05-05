import { createSelector } from "reselect";

const selectOfflineOrdersState = (state) =>
  state.offlineOrders ?? { orders: [], loading: false, error: null };

export const selectOfflineOrders = createSelector(
  [selectOfflineOrdersState],
  (offlineOrders) => {
    console.log(
      "🔎 Selector FINAL CHECK - offlineOrders object:",
      JSON.stringify(offlineOrders, null, 2)
    );
    return offlineOrders.orders ?? []; // 🔥 Переконуємось, що це масив
  }
);

export const selectOfflineOrdersLoading = createSelector(
  [selectOfflineOrdersState],
  (offlineOrders) => offlineOrders.loading ?? false
);

export const selectOfflineOrdersError = createSelector(
  [selectOfflineOrdersState],
  (offlineOrders) => offlineOrders.error ?? null
);
