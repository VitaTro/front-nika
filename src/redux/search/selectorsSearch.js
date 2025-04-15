import { createSelector } from "@reduxjs/toolkit";

export const selectSearchState = (state) => state?.search || {}; // Додаємо захист від undefined

export const selectSearchResults = createSelector(
  [selectSearchState],
  (search) => search?.results || [] // Повертаємо стабільний масив
);

export const selectSearchLoading = createSelector(
  [selectSearchState],
  (search) => !!search?.loading // Завжди повертаємо boolean
);

export const selectSearchError = createSelector(
  [selectSearchState],
  (search) => search?.error || null // Завжди повертаємо null або string
);
