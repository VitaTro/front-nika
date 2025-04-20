import { createSelector } from "reselect";

export const selectShopping = (state) => state.shopping.products;

export const selectShoppingCartItems = createSelector(
  [selectShopping],
  (shopping) =>
    shopping.products.map((item) => ({
      ...item, // Розгортаємо дані `productId`
      productId: item.productId._id, // Дістаємо ID
      addedAt: item.addedAt, // Зберігаємо додаткову інформацію
    }))
);
export const selectShoppingCartLoading = createSelector(
  [selectShopping],
  (shopping) => shopping?.loading ?? false
);
export const selectShoppingCartError = createSelector(
  [selectShopping],
  (shopping) => shopping.error
);
export const isProductInShoppingCart = createSelector(
  [selectShopping, (_, productId) => productId],
  (shopping, productId) => shopping.some((item) => item.productId === productId)
);
