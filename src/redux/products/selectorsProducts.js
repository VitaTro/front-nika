export const selectProducts = (state) => state.products.items;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectCurrentProduct = (state) => state.products.currentProduct;
export const selectPromoProducts = (state) => state.products.promo;
export const selectPromoLoading = (state) => state.products.promoLoading;
