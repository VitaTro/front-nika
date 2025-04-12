import { createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProductByType,
  getProducts,
  updateProduct,
} from "./operationProducts";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    currentProduct: null, // Для зберігання даних конкретного продукту
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
      })
      .addCase(getProducts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(addProduct.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(getProductByType.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(getProductByType.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(getProductById.fulfilled, (state, { payload }) => {
        state.currentProduct = payload; // Зберігаємо дані конкретного продукту
      })
      .addCase(getProductById.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.items = state.items.map((item) =>
          item.id === payload.id ? payload : item
        ); // Оновлюємо продукт у списку
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((item) => item.id !== payload); // Видаляємо продукт зі списку
      })
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default productsSlice.reducer;
