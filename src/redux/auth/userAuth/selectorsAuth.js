// import { createSelector } from "@reduxjs/toolkit";

// // export const selectAuthUser = createSelector(
// //   (state) => state.userAuth?.user,
// //   (user) => user || {},
// // );
// export const selectAuthUser = (state) => state.userAuth.user;
// export const selectIsLoggedIn = createSelector(
//   (state) => state.userAuth,
//   (auth) => !!auth.user,
// );
// export const selectAuthLoading = (state) => state.userAuth.loading;
// export const selectAuthError = (state) => state.userAuth.error;
// // export const selectAuthToken = (state) => state.auth.token;

// // export const selectAuthLoading = (state) => state.userAuth?.loading ?? false;
// // export const selectAuthError = (state) => state.userAuth?.error ?? null;
// // export const selectIsLoggedIn = (state) => state.userAuth?.isLoggedIn ?? false;

// // export const selectIsUserAuthenticated = (state) => !!state.userAuth?.accessToken && state.userAuth?.isLoggedIn;

// // export const selectToken = (state) =>
// //   state.userAuth?.accessToken || localStorage.getItem("accessToken");
import { createSelector } from "@reduxjs/toolkit";

export const selectAuthState = (state) => state.userAuth;

export const selectAuthUser = createSelector(
  [selectAuthState],
  (auth) => auth.user,
);

export const selectIsLoggedIn = createSelector(
  [selectAuthState],
  (auth) => !!auth.user,
);

export const selectAuthLoading = createSelector(
  [selectAuthState],
  (auth) => auth.loading,
);

export const selectAuthError = createSelector(
  [selectAuthState],
  (auth) => auth.error,
);
