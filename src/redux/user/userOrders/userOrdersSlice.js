// redux/user/userOrders/userOrdersSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  confirmOrderReceived,
  createOrder,
  fetchPurchaseHistory,
  fetchUserOrders,
  returnOrder,
} from "./operationsUserOrders";

const initialState = {
  orders: [],
  purchaseHistory: [],
  loading: false,
  error: null,
};

const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ===============================
      // GET USER ORDERS
      // ===============================
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===============================
      // CREATE ORDER
      // ===============================
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        // бекенд повертає { message, order, paymentUrl }
        state.orders.unshift(action.payload.order);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===============================
      // RETURN ORDER
      // ===============================
      .addCase(returnOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order,
        );
      })

      // ===============================
      // CONFIRM RECEIVED
      // ===============================
      .addCase(confirmOrderReceived.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order,
        );
      })

      // ===============================
      // PURCHASE HISTORY
      // ===============================
      .addCase(fetchPurchaseHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPurchaseHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.purchaseHistory = action.payload;
      })
      .addCase(fetchPurchaseHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userOrdersSlice.reducer;
