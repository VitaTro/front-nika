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
      .addCase(applyFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredItems = action.payload;
      })
      .addCase(applyFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default filtersSlice.reducer;
