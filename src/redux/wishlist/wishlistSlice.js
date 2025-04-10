import { createSlice } from "@reduxjs/toolkit";
import {
  addProductToWishlist,
  getWishlist,
  removeProductFromWishlist,
} from "./operationWishlist";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlist = action.payload;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.wishlist.push(action.payload); // Додаємо продукт до списку бажань
      })
      .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
        state.wishlist = state.wishlist.filter(
          (product) => product.id !== action.payload
        ); // Видаляємо продукт зі списку бажань
      });
  },
});

export const wishlistReducer = wishlistSlice.reducer;
