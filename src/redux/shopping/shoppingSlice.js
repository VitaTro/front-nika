import { createSlice } from "@reduxjs/toolkit";
import {
  addProductToCart,
  deleteProductFromCart,
  getShoppingCart,
} from "./operationShopping";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShoppingCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getShoppingCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(getShoppingCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.cart.push(action.payload); // Додаємо продукт до корзини
      })
      .addCase(deleteProductFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter(
          (product) => product.id !== action.payload
        ); // Видаляємо продукт з корзини
      });
  },
});

export const shoppingCartReducer = shoppingCartSlice.reducer;
