import { createSlice } from "@reduxjs/toolkit";
import {
  addHandmadeCard,
  createProductFromHandmade,
  deleteHandmadeCard,
  fetchHandmadeCardById,
  fetchHandmadeCards,
  updateHandmadeCard,
} from "./operationsAdminHandmade";

const initialState = {
  handmadeCards: [], // список карток
  singleHandmadeCard: null, // одна картка для детальної сторінки
  loading: false,
  error: null,
};

const adminHandmadeReducer = createSlice({
  name: "adminHandmade",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ===== FETCH =====
      .addCase(fetchHandmadeCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHandmadeCards.fulfilled, (state, action) => {
        state.loading = false;
        state.handmadeCards = action.payload;
      })
      .addCase(fetchHandmadeCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================================
      // FETCH ONE
      // ======================================================
      .addCase(fetchHandmadeCardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHandmadeCardById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleHandmadeCard = action.payload;
      })
      .addCase(fetchHandmadeCardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================================
      // ADD
      // ======================================================
      .addCase(addHandmadeCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addHandmadeCard.fulfilled, (state, action) => {
        state.loading = false;
        state.handmadeCards.push(action.payload);
      })
      .addCase(addHandmadeCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================================
      // UPDATE
      // ======================================================
      .addCase(updateHandmadeCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHandmadeCard.fulfilled, (state, action) => {
        state.loading = false;
        state.handmadeCards = state.handmadeCards.map((card) =>
          card._id === action.payload._id ? action.payload : card,
        );

        // Якщо оновлюємо картку, яка відкрита на сторінці — оновлюємо і її
        if (state.singleHandmadeCard?._id === action.payload._id) {
          state.singleHandmadeCard = action.payload;
        }
      })
      .addCase(updateHandmadeCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================================
      // DELETE
      // ======================================================
      .addCase(deleteHandmadeCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHandmadeCard.fulfilled, (state, action) => {
        state.loading = false;
        state.handmadeCards = state.handmadeCards.filter(
          (card) => card._id !== action.payload,
        );

        if (state.singleHandmadeCard?._id === action.payload) {
          state.singleHandmadeCard = null;
        }
      })
      .addCase(deleteHandmadeCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================================
      // CREATE PRODUCT FROM HANDMADE
      // ======================================================
      .addCase(createProductFromHandmade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductFromHandmade.fulfilled, (state, action) => {
        state.loading = false;

        // Оновлюємо картку в списку
        state.handmadeCards = state.handmadeCards.map((card) =>
          card._id === action.payload._id ? action.payload : card,
        );

        // Оновлюємо картку на сторінці
        if (state.singleHandmadeCard?._id === action.payload._id) {
          state.singleHandmadeCard = action.payload;
        }
      })
      .addCase(createProductFromHandmade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminHandmadeReducer.reducer;
