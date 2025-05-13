import { createSelector } from "reselect";

const selectAdminAuthState = (state) => state.adminAuth || {}; // 🔥 Уникаємо undefined

export const selectAdminToken = createSelector(
  [selectAdminAuthState],
  (adminAuth) => adminAuth.token // 🔥 НЕ повертаємо новий об'єкт
);

export const selectAdminLoading = createSelector(
  [selectAdminAuthState],
  (adminAuth) => adminAuth.loading
);

export const selectAdminError = createSelector(
  [selectAdminAuthState],
  (adminAuth) => adminAuth.error
);
export const selectIsAdminAuthenticated = createSelector(
  [selectAdminToken],
  (token) => !!token // Конвертуємо токен у булеве значення
);
