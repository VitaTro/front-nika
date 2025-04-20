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
    products: [], // Товари у кошику
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
        console.log("Redux state updated with payload:", payload);
        state.loading = false;
        state.products = payload; // Оновлюємо стан з отриманими даними
        state.totalAmount = payload.reduce(
          (sum, product) => sum + product.price * product.quantity,
          0
        );
        state.totalQuantity = payload.reduce(
          (sum, product) => sum + product.quantity,
          0
        );
      })

      .addCase(getShoppingCart.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(addProductToShoppingCart.fulfilled, (state, { payload }) => {
        const exists = state.products.some(
          (product) => product.productId === payload.productId
        );
        if (!exists) {
          state.products.push(payload);
          state.totalAmount += payload.price * payload.quantity;
          state.totalQuantity += payload.quantity;
        }
      })

      .addCase(addProductToShoppingCart.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(updateProductToShoppingCart.fulfilled, (state, { payload }) => {
        const index = state.products.findIndex(
          (product) => product._id === payload._id
        );
        if (index !== -1) {
          const product = state.products[index];
          state.totalAmount -= product.price * product.quantity;
          state.totalQuantity -= product.quantity;

          product.quantity = payload.quantity;

          state.totalAmount += product.price * product.quantity;
          state.totalQuantity += product.quantity;
        }
      })

      .addCase(updateProductToShoppingCart.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(
        removeProductFromShoppingCart.fulfilled,
        (state, { payload }) => {
          console.log("Successfully removed product with ID:", payload);

          // Шукаємо продукт за `_id`
          const product = state.products.find(
            (product) => product._id === payload
          );

          if (product) {
            // Оновлюємо загальну суму та кількість
            state.totalAmount -= product.price * product.quantity;
            state.totalQuantity -= product.quantity;

            // Видаляємо товар із списку
            state.products = state.products.filter(
              (product) => product._id !== payload
            );
          } else {
            console.error("Product not found in state for ID:", payload);
          }
        }
      )
      .addCase(removeProductFromShoppingCart.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default shoppingCartSlice.reducer;
