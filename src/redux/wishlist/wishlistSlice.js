import { createSlice } from "@reduxjs/toolkit";
import {
  addProductToWishlist,
  getWishlist,
  moveProductToShoppingCart,
  removeProductFromWishlist,
} from "./operationWishlist";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: [], // Список бажаних товарів
    loading: false, // Стан завантаження
    error: null, // Помилка
  },
  reducers: {}, // Можна додати синхронні редюсери, якщо потрібно
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishlist.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload;
      })
      .addCase(getWishlist.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(addProductToWishlist.fulfilled, (state, { payload }) => {
        const exists = state.products.some(
          (product) => product.productId === payload.productId,
        );
        if (!exists) {
          state.products.push(payload);
        }
      })

      .addCase(addProductToWishlist.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(removeProductFromWishlist.fulfilled, (state, { payload }) => {
        state.products = state.products.filter(
          (product) => product.productId !== payload,
        );
      })

      .addCase(removeProductFromWishlist.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(moveProductToShoppingCart.fulfilled, (state, { payload }) => {
        console.log("Product successfully moved to shopping cart:", payload);

        // Видаляємо товар зі списку бажань
        state.products = state.products.filter(
          (product) => product._id !== payload._id,
        );
      })
      .addCase(moveProductToShoppingCart.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default wishlistSlice.reducer;
