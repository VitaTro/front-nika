import { createSlice } from "@reduxjs/toolkit";
import {
  deleteMovement,
  fetchProductMovements,
  fetchProductSummary,
  fetchProductSummaryAlt,
  fetchStockMovements,
  fetchStockSummary,
  updateMovement,
  uploadSingleMovement,
} from "./operationsStockMovement";

const initialState = {
  allMovements: [],
  productMovements: {},
  byIndex: {},
  loading: false,
  error: null,
  deletedMovements: [],
  newSummaries: {},
  newSummaryLoading: {},
  newSummaryError: {},
};

const stockMovementSlice = createSlice({
  name: "stockMovement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;

    builder;
    builder
      .addCase(fetchProductSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProductSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProductMovements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductMovements.fulfilled, (state, action) => {
        const { productIndex, data } = action.payload;
        state.loading = false;
        state.productMovements[productIndex] = data;
      })
      .addCase(fetchProductMovements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Не вдалося завантажити рухи";
      })
      .addCase(fetchStockMovements.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStockMovements.fulfilled, (state, action) => {
        state.loading = false;
        state.allMovements = action.payload;
      })
      .addCase(fetchStockMovements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📊 SUMMARY
      .addCase(fetchStockSummary.pending, (state, action) => {
        const index = action.meta.arg;
        state.loading[index] = true;
        state.error[index] = null;
      })
      .addCase(fetchStockSummary.fulfilled, (state, action) => {
        if (!action.payload || !action.payload.productIndex) {
          console.warn("⚠️ Порожній payload:", action.payload);
          return;
        }
        const { productIndex, data } = action.payload;
        state.byIndex[productIndex] = data;
        state.loading[productIndex] = false;
      })
      .addCase(fetchStockSummary.rejected, (state, action) => {
        const { productIndex, error } = action.payload;
        state.error[productIndex] = error;
        state.loading[productIndex] = false;
      })

      // ➕ ДОДАТИ РУХ
      .addCase(uploadSingleMovement.fulfilled, (state, action) => {
        state.allMovements.unshift(action.payload);
      })

      // ✏️ ОНОВИТИ РУХ
      .addCase(updateMovement.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.allMovements.findIndex((m) => m._id === updated._id);
        if (idx !== -1) {
          state.allMovements[idx] = updated;
        }
      })

      // ❌ ВИДАЛИТИ РУХ
      .addCase(deleteMovement.fulfilled, (state, action) => {
        const deletedId = action.payload.id;
        state.allMovements = state.allMovements.filter(
          (m) => m._id !== deletedId
        );
        state.deletedMovements.push(deletedId);
      })
      .addCase(fetchProductSummaryAlt.pending, (state, action) => {
        const index = action.meta.arg;
        state.newSummaryLoading[index] = true;
        state.newSummaryError[index] = null;
      })
      .addCase(fetchProductSummaryAlt.fulfilled, (state, action) => {
        const { productIndex, data } = action.payload;
        state.newSummaries[productIndex] = data;
        state.newSummaryLoading[productIndex] = false;
      })
      .addCase(fetchProductSummaryAlt.rejected, (state, action) => {
        const index = action.meta.arg;
        state.newSummaryLoading[index] = false;
        state.newSummaryError[index] =
          typeof action.payload === "string"
            ? action.payload
            : "Не вдалося завантажити нове саммері";
      });
  },
});

export default stockMovementSlice.reducer;
