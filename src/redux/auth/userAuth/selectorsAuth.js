import { createSelector } from "@reduxjs/toolkit";

export const selectAuthUser = createSelector(
  (state) => state.userAuth?.user,
  (user) => user || {}
);

export const selectAuthToken = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth?.loading ?? false;
export const selectAuthError = (state) => state.auth?.error ?? null;
export const selectIsLoggedIn = (state) => state.auth?.isLoggedIn ?? false;
export const selectIsUserAuthenticated = (state) =>
  !!state.userAuth?.accessToken && state.userAuth?.isLoggedIn;
