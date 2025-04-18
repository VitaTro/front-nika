import { createSelector } from "reselect";

export const selectWishlist = (state) => state.wishlist;

export const selectWishlistProducts = createSelector(
  [selectWishlist],
  (wishlist) => wishlist.products || []
);

export const selectWishlistLoading = createSelector(
  [selectWishlist],
  (wishlist) => wishlist?.loading ?? false
);

export const selectWishlistError = createSelector(
  [selectWishlist],
  (wishlist) => wishlist.error
);
