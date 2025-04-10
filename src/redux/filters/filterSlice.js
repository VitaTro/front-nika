import { createSlice } from "@reduxjs/toolkit";
import { applyFilters } from "./operationFilters";

const initialState = {
  filters: {
    priceRange: { min: 0, max: 1000 },
    materials: [],
    categories: [],
  },
  filteredProducts: [],
  isLoading: false,
  error: null,
  filtersActive: false,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setPriceFilter(state, { payload }) {
      state.filters.priceRange = payload;
      state.filtersActive = true;
    },
    setMaterialFilter(state, { payload }) {
      state.filters.materials = payload;
    },
    setCategoryFilter(state, { payload }) {
      state.filters.categories = payload;
    },
    clearFilters(state) {
      state.filters = {
        priceRange: { min: 0, max: 1000 },
        materials: [],
        categories: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyFilters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(applyFilters.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.filteredProducts = payload;
      })
      .addCase(applyFilters.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const {
  setPriceFilter,
  setMaterialFilter,
  setCategoryFilter,
  clearFilters,
} = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
