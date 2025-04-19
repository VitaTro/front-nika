import { createSelector } from "reselect";

export const selectShopping = (state) => state.shopping;

export const selectShoppingCartItems = createSelector(
  [selectShopping],
  (shopping) =>
    shopping.products.map((item) => ({
      ...item, // Розгортаємо дані `productId`
      productId: item.productId._id, // Дістаємо ID
      addedAt: item.addedAt, // Зберігаємо додаткову інформацію
    }))
);
export const electShoppingCartLoading = createSelector(
  [selectShopping],
  (shopping) => shopping?.loading ?? false
);
export const selectShoppingCartError = createSelector(
  [selectShopping],
  (shopping) => shopping.error
);
