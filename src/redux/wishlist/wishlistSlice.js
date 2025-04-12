import { createSlice } from "@reduxjs/toolkit";
import {
  addProductToWishlist,
  getWishlist,
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
        state.products = payload; // Оновлюємо список бажаних товарів
      })
      .addCase(getWishlist.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(addProductToWishlist.fulfilled, (state, { payload }) => {
        state.products.push(payload); // Додаємо товар до списку
      })
      .addCase(addProductToWishlist.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(removeProductFromWishlist.fulfilled, (state, { payload }) => {
        state.products = state.products.filter(
          (product) => product.id !== payload
        ); // Видаляємо товар зі списку
      })
      .addCase(removeProductFromWishlist.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default wishlistSlice.reducer;
