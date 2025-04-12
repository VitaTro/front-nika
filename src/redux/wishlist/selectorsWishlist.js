import { createSelector } from "reselect";

export const selectWishlist = (state) => state.wishlist;

export const selectWishlistProducts = createSelector(
  [selectWishlist],
  (products) => products
);

export const selectWishlistLoading = createSelector(
  [selectWishlist],
  (wishlist) => wishlist.loading
);

export const selectWishlistError = createSelector(
  [selectWishlist],
  (wishlist) => wishlist.error
);
