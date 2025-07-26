import { createSelector } from "reselect";

export const selectShoppingCartState = (state) => state.shoppingCart;

export const selectShopping = createSelector(
  [selectShoppingCartState],
  (state) => state.products
);
export const selectShoppingCartError = createSelector(
  [selectShoppingCartState],
  (state) => state.error
);

export const isProductInShoppingCart = createSelector(
  [selectShopping, (_, productId) => productId],
  (shopping, productId) =>
    shopping.some(
      (item) =>
        item.productId?._id === productId || item.productId === productId
    )
);
export const selectShoppingCartLoading = createSelector(
  [selectShoppingCartState],
  (state) => state.loading ?? false
);

export const selectTotalAmount = createSelector([selectShopping], (shopping) =>
  shopping.reduce((acc, item) => acc + item.price * item.quantity, 0)
);
export const selectShoppingCartItems = createSelector(
  [selectShopping],
  (shopping) =>
    shopping.map((item) => ({
      ...item,
      productId: item.productId?._id || item.productId,
      addedAt: item.addedAt,
      productIndex: item.productIndex, // ✳️ якщо є в схемі
    }))
);
