import { createSlice } from "@reduxjs/toolkit";
import {
  deleteMovement,
  fetchStockMovements,
  updateMovement,
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
      .addCase(updateMovement.fulfilled, (state, action) => {
        const updated = action.payload.movement;
        state.movements = state.movements.map((m) =>
          m._id === updated._id ? updated : m
        );
        state.success = "Рух успішно оновлено!";
      })
      .addCase(deleteMovement.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.movements = state.movements.filter((m) => m._id !== id);
        state.success = "Рух успішно видалено!";
      })
      .addCase(updateMovement.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteMovement.rejected, (state, action) => {
        state.error = action.payload;
      })
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
