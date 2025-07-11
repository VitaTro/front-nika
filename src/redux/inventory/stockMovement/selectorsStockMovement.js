export const selectStockMovements = (state) =>
  state?.inventory?.stockMovement?.allMovements ?? [];

export const selectStockSummary = (state, index) =>
  state?.inventory?.stockMovement?.byIndex?.[index] || null;

export const selectMovementsForProduct = (state, index) =>
  state?.inventory?.stockMovement?.movementsByIndex[index] || [];

export const selectCurrentStock = (state, index) => {
  return state?.inventory?.stockMovement?.byIndex?.[index]?.currentStock || 0;
};

export const selectRetailPrice = (state, index) => {
  state?.inventory?.stockMovement?.byIndex?.[index]?.lastPurchase?.price ||
    null;
};

export const selectStockError = (state) =>
  state?.inventory?.stockMovement?.error || null;

export const selectStockLoading = (state) =>
  state?.inventory?.stockMovement?.loading || false;

export const selectProductMovements = (state, productIndex) =>
  state?.inventory?.stockMovement?.productMovements[productIndex] || null;
export const selectAllProductIndexes = (state) => {
  const movements = state?.inventory?.stockMovement?.allMovements ?? [];
  return [...new Set(movements.map((m) => m.productIndex))];
};
