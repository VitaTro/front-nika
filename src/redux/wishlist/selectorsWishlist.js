import { createSelector } from "reselect";

export const selectWishlist = (state) => state.wishlist;

export const selectWishlistProducts = createSelector(
  [selectWishlist],
  (wishlist) =>
    wishlist.products.map((item) => ({
      ...item, // Розгортаємо дані `productId`
      productId: item.productId._id, // Дістаємо ID
      addedAt: item.addedAt, // Зберігаємо додаткову інформацію
    }))
);

export const selectWishlistLoading = createSelector(
  [selectWishlist],
  (wishlist) => wishlist?.loading ?? false
);

export const selectWishlistError = createSelector(
  [selectWishlist],
  (wishlist) => wishlist.error
);

export const isProductInWishlist = createSelector(
  [selectWishlistProducts, (_, productId) => productId],
  (wishlist, productId) => wishlist.some((item) => item.productId === productId)
);
