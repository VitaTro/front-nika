import { createSlice } from "@reduxjs/toolkit";
import {
  createOnlineOrder,
  fetchOnlineOrderById,
  fetchOnlineOrders,
  updateOnlineOrderStatus,
} from "./operationOnlineOrder";

const onlineOrderSlice = createSlice({
  name: "onlineOrders",
  initialState: {
    orders: [], // Список усіх замовлень
    currentOrder: null, // Дані про окреме замовлення
    isLoading: false, // Стан завантаження
    error: null, // Помилки
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Логіка отримання списку замовлень
      .addCase(fetchOnlineOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOnlineOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload; // Зберігаємо список замовлень
      })
      .addCase(fetchOnlineOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Зберігаємо помилку
      })

      // Логіка створення нового замовлення
      .addCase(createOnlineOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOnlineOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.push(action.payload.order); // Додаємо нове замовлення до списку
      })
      .addCase(createOnlineOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Зберігаємо помилку
      })

      // Логіка отримання конкретного замовлення
      .addCase(fetchOnlineOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOnlineOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload; // Зберігаємо дані конкретного замовлення
      })
      .addCase(fetchOnlineOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Зберігаємо помилку
      })

      // Логіка оновлення статусу замовлення
      .addCase(updateOnlineOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOnlineOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.orders.findIndex(
          (order) => order.orderId === action.payload.orderId
        );
        if (index !== -1) {
          state.orders[index] = { ...state.orders[index], ...action.payload }; // Оновлюємо замовлення
        }
      })
      .addCase(updateOnlineOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Зберігаємо помилку
      });
  },
});

export default onlineOrderSlice.reducer;
