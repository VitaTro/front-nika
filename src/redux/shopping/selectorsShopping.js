import { createSelector } from "reselect";

export const selectShopping = (state) => state.shoppingCart.products;

export const selectShoppingCartItems = createSelector(
  [selectShopping],
  (shopping) =>
    shopping.map((item) => ({
      ...item,
      productId: item.productId?._id || item.productId, // ✅ Запобігаємо `undefined`
      addedAt: item.addedAt,
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
  (shopping, productId) =>
    shopping.some(
      (item) =>
        item.productId?._id === productId || item.productId === productId
    )
);
export const selectTotalAmount = createSelector([selectShopping], (shopping) =>
  shopping.reduce((acc, item) => acc + item.price * item.quantity, 0)
);
