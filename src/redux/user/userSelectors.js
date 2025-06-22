export const selectUser = (state) => state.user.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserAddress = (state) => state.user.user?.address || {};
export const selectRecentViews = (state) => state.user.recentViews;
export const selectAuthLoading = (state) => state.user.loading;
export const selectAuthError = (state) => state.user.error;
export const selectUserProducts = (state) => state.user.products;
export const selectWallet = (state) => state.user.wallet;

export const selectUserSettings = (state) => state.user.settings;

export const selectAllowWalletUsage = (state) =>
  state.user.settings?.allowWalletUsage ?? true;
