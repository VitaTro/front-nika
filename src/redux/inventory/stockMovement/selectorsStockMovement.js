export const selectStockMovements = (state) =>
  state?.inventory?.stockMovement?.allMovements ?? [];

// 🧠 Витягнути summary
export const selectStockSummary = (state, index) =>
  state?.inventory?.stockMovement?.byIndex?.[index] || null;

// 📜 Історія рухів для продукту
export const selectMovementsForProduct = (state, index) =>
  state?.inventory?.stockMovement?.movementsByIndex[index] || [];

// 📦 Показати залишок
export const selectCurrentStock = (state, index) => {
  return state?.inventory?.stockMovement?.byIndex?.[index]?.currentStock || 0;
};

// 💸 Остання роздрібна ціна
export const selectRetailPrice = (state, index) => {
  state?.inventory?.stockMovement?.byIndex?.[index]?.lastPurchase?.price ||
    null;
};

// ❌ Помилки
export const selectStockError = (state) =>
  state?.inventory?.stockMovement?.error || null;

// ⏳ Завантаження
export const selectStockLoading = (state) =>
  state?.inventory?.stockMovement?.loading || false;
// 🔁 Усі рухи товарів
