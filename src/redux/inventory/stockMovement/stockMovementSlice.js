import { createSlice } from "@reduxjs/toolkit";
import {
  fetchStockMovements,
  uploadSingleMovement,
} from "./operationsStockMovement";

const initialState = {
  movements: [],
  loading: false,
  error: null,
};

const stockMovementSlice = createSlice({
  name: "stockMovement",
  initialState,
  reducers: {
    clearMovements: (state) => {
      state.movements = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockMovements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStockMovements.fulfilled, (state, action) => {
        state.loading = false;
        state.movements = action.payload;
      })
      .addCase(fetchStockMovements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Помилка при завантаженні рухів";
      })
      .addCase(uploadSingleMovement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadSingleMovement.fulfilled, (state, action) => {
        state.loading = false;
        state.movements.unshift(action.payload); // додаємо новий рух угору списку
      })
      .addCase(uploadSingleMovement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Помилка при додаванні руху";
      });
  },
});

export const { clearMovements } = stockMovementSlice.actions;
export default stockMovementSlice.reducer;
