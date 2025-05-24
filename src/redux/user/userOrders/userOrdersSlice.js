import { createSlice } from "@reduxjs/toolkit";
import {
  confirmOrderReceived,
  createOrder,
  fetchProcessingOrders,
  fetchPurchaseHistory,
  fetchShippedOrders,
  fetchUnpaidOrders,
  fetchUserOrders,
  returnOrder,
} from "./operationsUserOrders";

const initialState = {
  orders: [],
  purchaseHistory: [],
  loading: false,
  error: null,
};

const userOrdersReducer = createSlice({
  name: "userOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📌 Фільтри статусів
      .addCase(fetchUnpaidOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchProcessingOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchShippedOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })

      // 📌 Створення замовлення
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload);
      })

      // 📌 Повернення замовлення
      .addCase(returnOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
      })

      // 📌 Підтвердження отримання
      .addCase(confirmOrderReceived.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
      })

      // 📌 Історія покупок
      .addCase(fetchPurchaseHistory.fulfilled, (state, action) => {
        state.purchaseHistory = action.payload;
      });
  },
});

export default userOrdersReducer.reducer;
