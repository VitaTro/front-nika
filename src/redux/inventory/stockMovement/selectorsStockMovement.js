export const selectStockMovements = (state) =>
  state.inventory.stockMovement.movements;
export const selectStockLoading = (state) =>
  state.inventory.stockMovement.loading;
export const selectStockError = (state) => state.inventory.stockMovement.error;
