import { createSelector } from "reselect";

const selectAdminHandmadeState = (state) => state.adminHandmade;

// всі handmade картки
export const selectHandmadeCards = createSelector(
  [selectAdminHandmadeState],
  (state) => state.handmadeCards,
);

// завантаження
export const selectHandmadeLoading = createSelector(
  [selectAdminHandmadeState],
  (state) => state.loading,
);

// помилка
export const selectHandmadeError = createSelector(
  [selectAdminHandmadeState],
  (state) => state.error,
);

// картка по ID
export const selectHandmadeById = (id) =>
  createSelector([selectHandmadeCards], (cards) =>
    cards.find((card) => card._id === id),
  );
