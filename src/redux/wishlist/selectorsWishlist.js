import { createSelector } from "reselect";

export const selectWishlist = (state) => state.wishlist;

// export const selectWishlistProducts = createSelector(
//   [selectWishlist],
//   (wishlist) =>
//     wishlist.products.map((item) => ({
//       ...item,
//       productId: item.productId._id,
//       addedAt: item.addedAt,
//     }))
// );
export const selectWishlistProducts = createSelector(
  [selectWishlist],
  (wishlist) => {
    const products = wishlist?.products ?? [];

    return products.map((item) => ({
      ...item,
      productId: item.productId?._id ?? item.productId,
      addedAt: item.addedAt,
    }));
  },
);

export const selectWishlistLoading = createSelector(
  [selectWishlist],
  (wishlist) => wishlist?.loading ?? false,
);

export const selectWishlistError = createSelector(
  [selectWishlist],
  (wishlist) => wishlist.error,
);

export const isProductInWishlist = createSelector(
  [selectWishlistProducts, (_, productId) => productId],
  (wishlist, productId) =>
    wishlist.some((item) => item.productId === productId),
);
