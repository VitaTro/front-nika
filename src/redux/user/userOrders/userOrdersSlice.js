import { createSlice } from "@reduxjs/toolkit";
import { createUserOrder, fetchPurchaseHistory } from "./operationsUserOrders";

const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState: {
    orders: [], // Для списку замовлень
    purchaseHistory: [], // Для історії покупок
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders.push(payload); // Додаємо нове замовлення до списку
      })
      .addCase(createUserOrder.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Отримання історії покупок користувача
      .addCase(fetchPurchaseHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPurchaseHistory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.purchaseHistory = payload; // Зберігаємо історію покупок
      })
      .addCase(fetchPurchaseHistory.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default userOrdersSlice.reducer;
