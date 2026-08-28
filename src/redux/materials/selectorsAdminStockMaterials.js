import { createSelector } from "reselect";

const selectAdminStockMaterialsState = (state) => state.adminStockMaterials;

// всі рухи
export const selectStockMaterials = createSelector(
  [selectAdminStockMaterialsState],
  (state) => state.stock,
);

// завантаження
export const selectStockMaterialsLoading = createSelector(
  [selectAdminStockMaterialsState],
  (state) => state.loading,
);

// помилка
export const selectStockMaterialsError = createSelector(
  [selectAdminStockMaterialsState],
  (state) => state.error,
);

// рухи по конкретному матеріалу
export const selectStockMaterialsByMaterialId = (materialId) =>
  createSelector([selectStockMaterials], (stock) =>
    stock.filter((item) => item.materialId === materialId),
  );
