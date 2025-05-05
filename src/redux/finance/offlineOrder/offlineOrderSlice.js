import { createSlice } from "@reduxjs/toolkit";

import {
  createOfflineOrder,
  fetchOfflineOrders,
  updateOfflineOrderStatus,
} from "./operationOfflineOrder";

const offlineOrdersSlice = createSlice({
  name: "offlineOrders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfflineOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOfflineOrders.fulfilled, (state, action) => {
        console.log("📊 Full API Response:", action.payload);
        state.loading = false;
        state.orders = structuredClone(action.payload) ?? []; // 🔥 Використовуємо `structuredClone`
        console.log(
          "📊 Updated Redux State AFTER mutation:",
          JSON.stringify(state.orders, null, 2)
        );
      })

      .addCase(fetchOfflineOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createOfflineOrder.fulfilled, (state, action) => {
        console.log(
          "🚀 createOfflineOrder SUCCESS! New order:",
          JSON.stringify(action.payload, null, 2)
        );
        state.orders.push(action.payload);
      }) // Логіка оновлення статусу офлайн-замовлення
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

export default offlineOrdersSlice.reducer;
