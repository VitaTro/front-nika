import { createSelector } from "@reduxjs/toolkit";

export const selectAuthUser = createSelector(
  (state) => state.userAuth?.user,
  (user) => user || {}
);

export const selectAuthToken = (state) => state.auth.token; // Токен
export const selectAuthLoading = (state) => state.auth?.loading ?? false; // Стан завантаження
export const selectAuthError = (state) => state.auth?.error ?? null; // Помилки
export const selectIsLoggedIn = (state) => state.auth?.isLoggedIn ?? false; // Авторизація користувача
export const selectIsUserAuthenticated = (state) =>
  !!state.auth?.token && state.auth?.isLoggedIn && state.auth?.isVerified;
