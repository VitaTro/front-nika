import { createSlice } from "@reduxjs/toolkit";
import {
  createOnlineSale,
  fetchOnlineSales,
  updateOnlineSale,
} from "./operationOnlineSale";

const onlineSaleSlice = createSlice({
  name: "onlineSales",
  initialState: {
    sales: [], // Список усіх продажів
    isLoading: false, // Стан завантаження
    error: null, // Помилки
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Логіка отримання списку продажів
      .addCase(fetchOnlineSales.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOnlineSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sales = action.payload; // Зберігаємо список продажів
      })
      .addCase(fetchOnlineSales.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Зберігаємо помилку
      })

      // Логіка створення нового продажу
      .addCase(createOnlineSale.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOnlineSale.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sales.push(action.payload); // Додаємо новий продаж до списку
      })
      .addCase(createOnlineSale.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Зберігаємо помилку
      })

      // Логіка оновлення даних продажу
      .addCase(updateOnlineSale.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOnlineSale.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.sales.findIndex(
          (sale) => sale.id === action.payload.id
        );
        if (index !== -1) {
          state.sales[index] = { ...state.sales[index], ...action.payload }; // Оновлюємо продаж
        }
      })
      .addCase(updateOnlineSale.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Зберігаємо помилку
      });
  },
});

export default onlineSaleSlice.reducer;
