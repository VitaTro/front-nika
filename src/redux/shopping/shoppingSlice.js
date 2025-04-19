import { createSlice } from "@reduxjs/toolkit";
import {
  addProductToShoppingCart,
  getShoppingCart,
  removeProductFromShoppingCart,
  updateProductToShoppingCart,
} from "./operationShopping";

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: {
    items: [], // Товари у кошику
    totalAmount: 0,
    totalQuantity: 0,
    loading: false, // Стан завантаження
    error: null, // Помилки
  },
  reducers: {}, // Можна додати синхронні редюсери, якщо потрібно
  extraReducers: (builder) => {
    builder
      .addCase(getShoppingCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShoppingCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload; // Оновлюємо список товарів у кошику
        state.totalAmount = payload.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      })
      .addCase(getShoppingCart.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(addProductToShoppingCart.fulfilled, (state, { payload }) => {
        state.totalAmount += payload.price * payload.quantity;
        const exists = state.products.some(
          (product) => product.productId === payload.productId
        );
        if (!exists) {
          state.products.push(payload);
        }
      })
      .addCase(addProductToShoppingCart.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(updateProductToShoppingCart.fulfilled, (state, { payload }) => {
        const index = state.items.findIndex((item) => item._id === payload._id);
        if (index !== -1) {
          state.items[index].quantity = payload.quantity;
          state.totalQuantity = state.items.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          state.totalAmount = state.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
        }
      })
      .addCase(
        removeProductFromShoppingCart.fulfilled,
        (state, { payload }) => {
          state.items = state.items.filter((item) => item._id !== payload);
          state.totalAmount = state.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
        }
      )
      .addCase(removeProductFromShoppingCart.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default shoppingCartSlice.reducer;
