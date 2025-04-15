import { createSlice } from "@reduxjs/toolkit";
import { searchProducts } from "./operationSearch";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [], // Завжди масив
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
        console.log("Redux received payload:", payload); // Лог відповіді
        state.loading = false;
        state.results = payload.results || []; // Встановлюємо дані
      })
      .addCase(searchProducts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || "Something went wrong";
      });
  },
});

export default searchSlice.reducer;
