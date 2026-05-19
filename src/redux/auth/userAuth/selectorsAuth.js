import { createSelector } from "@reduxjs/toolkit";

export const selectAuthUser = createSelector(
  (state) => state.userAuth?.user,
  (user) => user || {},
);

// export const selectAuthToken = (state) => state.auth.token;

export const selectAuthLoading = (state) => state.userAuth?.loading ?? false;
export const selectAuthError = (state) => state.userAuth?.error ?? null;
export const selectIsLoggedIn = (state) => state.userAuth?.isLoggedIn ?? false;

// export const selectIsUserAuthenticated = (state) => !!state.userAuth?.accessToken && state.userAuth?.isLoggedIn;

// export const selectToken = (state) =>
//   state.userAuth?.accessToken || localStorage.getItem("accessToken");
