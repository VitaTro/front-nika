export const selectShoppingCartItems = (state) => state.shoppingCart.items; // Усі товари в кошику
export const selectShoppingCartLoading = (state) => state.shoppingCart.loading; // Стан завантаження
export const selectShoppingCartError = (state) => state.shoppingCart.error; // Помилки
