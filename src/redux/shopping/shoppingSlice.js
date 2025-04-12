import { createSlice } from "@reduxjs/toolkit";
import {
  addProductToShoppingCart,
  getShoppingCart,
  removeProductFromShoppingCart,
} from "./operationShopping";

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: {
    items: [], // Товари у кошику
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
      })
      .addCase(getShoppingCart.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(addProductToShoppingCart.fulfilled, (state, { payload }) => {
        state.items.push(payload); // Додаємо товар до кошика
      })
      .addCase(addProductToShoppingCart.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(
        removeProductFromShoppingCart.fulfilled,
        (state, { payload }) => {
          state.items = state.items.filter((item) => item.id !== payload); // Видаляємо товар із кошика
        }
      )
      .addCase(removeProductFromShoppingCart.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default shoppingCartSlice.reducer;
