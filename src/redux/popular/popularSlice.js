import { createSlice } from "@reduxjs/toolkit";
import { getPopularProducts } from "./operationPopular";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

const popularSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPopularProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPopularProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.products = action.payload;
      })
      .addCase(getPopularProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const popularProductsReducer = popularSlice.reducer;
