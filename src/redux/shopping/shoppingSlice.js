import { createSlice } from "@reduxjs/toolkit";
import {
  addProductToShoppingCart,
  getShoppingCart,
  moveProductToWishlist,
  removeProductFromShoppingCart,
  updateProductToShoppingCart,
} from "./operationShopping";

const shoppingCartReducer = createSlice({
  name: "shoppingCart",
  initialState: {
    products: [],
    totalAmount: 0,
    totalQuantity: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShoppingCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getShoppingCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload;
        state.totalAmount = payload.reduce(
          (sum, p) => sum + p.price * p.quantity,
          0
        );
        state.totalQuantity = payload.reduce((sum, p) => sum + p.quantity, 0);
      })
      .addCase(getShoppingCart.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(addProductToShoppingCart.fulfilled, (state, { payload }) => {
        console.log("✅ Redux state updated with new product:", payload);
        const existingProduct = state.products.find(
          (p) => p.productId === payload.productId
        );
        if (existingProduct) {
          existingProduct.quantity += payload.quantity;
        } else {
          state.products.push(payload);
        }
        state.totalAmount += payload.price * payload.quantity;
        state.totalQuantity += payload.quantity;
      })

      .addCase(updateProductToShoppingCart.fulfilled, (state, { payload }) => {
        const index = state.products.findIndex((p) => p._id === payload._id);
        if (index !== -1) {
          state.products[index].quantity = payload.quantity;
        }
      })
      .addCase(
        removeProductFromShoppingCart.fulfilled,
        (state, { payload }) => {
          state.products = state.products.filter((p) => p._id !== payload);
          state.totalAmount = state.products.reduce(
            (sum, p) => sum + p.price * p.quantity,
            0
          );
          state.totalQuantity = state.products.reduce(
            (sum, p) => sum + p.quantity,
            0
          );
        }
      )
      .addCase(moveProductToWishlist.fulfilled, (state, { payload }) => {
        state.products = state.products.filter((p) => p._id !== payload._id);
        state.totalAmount -= payload.price * payload.quantity;
        state.totalQuantity -= payload.quantity;
      });
  },
});

export default shoppingCartReducer.reducer;
