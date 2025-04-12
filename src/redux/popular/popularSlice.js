import { createSlice } from "@reduxjs/toolkit";
import { getPopularProducts } from "./operationPopular";

const popularSlice = createSlice({
  name: "popular",
  initialState: {
    popularItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopularProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPopularProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.popularItems = payload;
      })
      .addCase(getPopularProducts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default popularSlice.reducer;
