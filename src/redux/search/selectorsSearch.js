import { createSelector } from "@reduxjs/toolkit";

// Захист від undefined
export const selectSearchState = (state) => state?.search || {};

// Стабільний селектор для результатів пошуку
export const selectSearchResults = createSelector(
  [selectSearchState],
  (search) => search?.results || []
);

// Селектор із додатковою обробкою результатів (мемоізовані дані)
export const selectProcessedResults = createSelector(
  [selectSearchResults],
  (results) => {
    return results.map((result) => ({
      ...result,
      extraInfo: "processed",
    }));
  }
);

// Стабільний селектор для стану завантаження
export const selectSearchLoading = createSelector(
  [selectSearchState],
  (search) => !!search?.loading // Завжди повертаємо boolean
);

// Стабільний селектор для помилки
export const selectSearchError = createSelector(
  [selectSearchState],
  (search) => search?.error || null // Завжди повертаємо null або string
);
