import { createSlice } from "@reduxjs/toolkit";
import { searchProducts } from "./operationSearch";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.results = payload;
      })
      .addCase(searchProducts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default searchSlice.reducer;
