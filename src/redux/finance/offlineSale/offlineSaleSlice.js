import { createSlice } from "@reduxjs/toolkit";
import {
  createOfflineSale,
  fetchOfflineSales,
  updateOfflineSale,
} from "./operationOfflineSale";

const offlineSaleSlice = createSlice({
  name: "offlineSales",
  initialState: {
    sales: [], // Список офлайн-продажів
    isLoading: false, // Стан завантаження
    error: null, // Помилки
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Логіка отримання всіх офлайн-продажів
      .addCase(fetchOfflineSales.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOfflineSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sales = action.payload; // Зберігаємо список продажів
      })
      .addCase(fetchOfflineSales.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Зберігаємо помилку
      })

      // Логіка створення нового офлайн-продажу
      .addCase(createOfflineSale.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOfflineSale.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sales.push(action.payload); // Додаємо новий продаж
      })
      .addCase(createOfflineSale.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Зберігаємо помилку
      })

      // Логіка оновлення даних офлайн-продажу
      .addCase(updateOfflineSale.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOfflineSale.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.sales.findIndex(
          (sale) => sale.id === action.payload.id
        );
        if (index !== -1) {
          state.sales[index] = { ...state.sales[index], ...action.payload }; // Оновлюємо продаж
        }
      })
      .addCase(updateOfflineSale.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Зберігаємо помилку
      });
  },
});

export default offlineSaleSlice.reducer;
