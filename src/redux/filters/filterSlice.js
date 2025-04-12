import { createSlice } from "@reduxjs/toolkit";
import { applyFilters } from "./operationFilter";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    filteredItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(applyFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyFilters.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.filteredItems = payload;
      })
      .addCase(applyFilters.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default filtersSlice.reducer;
