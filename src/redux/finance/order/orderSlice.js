import { createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  fetchOrderById,
  fetchOrders,
  updateOrderStatus,
} from "./operationOrder";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    currentOrder: null, // Для зберігання деталей окремого замовлення
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Логіка отримання списку замовлень
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = payload;
      })
      .addCase(fetchOrders.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // Логіка отримання окремого замовлення
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.currentOrder = payload; // Зберігаємо деталі замовлення
      })
      .addCase(fetchOrderById.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // Логіка створення нового замовлення
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders.push(payload); // Додаємо нове замовлення в список
      })
      .addCase(createOrder.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // Логіка оновлення статусу замовлення
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, { payload }) => {
        state.loading = false;
        // Оновлюємо статус у списку замовлень
        const index = state.orders.findIndex(
          (order) => order.orderId === payload.orderId
        );
        if (index !== -1) {
          state.orders[index] = { ...state.orders[index], ...payload };
        }
      })
      .addCase(updateOrderStatus.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default ordersSlice.reducer;
