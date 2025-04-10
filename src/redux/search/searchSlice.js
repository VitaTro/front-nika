import { createSlice } from "@reduxjs/toolkit";
import { getSearchProducts } from "./operationSearch";

const initialState = {
  searchResults: [],
  isLoading: false,
  error: null,
  reducers: {
    clearSearch(state) {
      state.result = [];
    },
  },
};

const searchSlice = createSlice({
  name: "searchResult",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getSearchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.result = action.payload;
      })
      .addCase(getSearchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const searchReducer = searchSlice.reducer;
