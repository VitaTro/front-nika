import { createSlice } from "@reduxjs/toolkit";
import {
  createOfflineOrder,
  fetchOfflineOrders,
  updateOfflineOrderStatus,
} from "./operationOfflineOrder";

const offlineOrderSlice = createSlice({
  name: "offlineOrders",
  initialState: {
    orders: [], // Список офлайн-замовлень
    isLoading: false, // Стан завантаження
    error: null, // Помилки
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Логіка отримання всіх офлайн-замовлень
      .addCase(fetchOfflineOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOfflineOrders.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.orders = action.payload; // Зберігаємо список замовлень
      })
      .addCase(fetchOfflineOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message; // Зберігаємо помилку
      })

      // Логіка створення нового офлайн-замовлення
      .addCase(createOfflineOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOfflineOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.push(action.payload); // Додаємо нове замовлення
      })
      .addCase(createOfflineOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Зберігаємо помилку
      })

      // Логіка оновлення статусу офлайн-замовлення
      .addCase(updateOfflineOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOfflineOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(
          (order) => order._id === updatedOrder._id
        );
        if (index !== -1) {
          state.orders[index] = updatedOrder; // Перезаписуємо новими даними з бекенду
        }
      })

      .addCase(updateOfflineOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Зберігаємо помилку
      });
  },
});

export default offlineOrderSlice.reducer;
