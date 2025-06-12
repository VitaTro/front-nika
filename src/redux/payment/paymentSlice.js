import { createSlice } from "@reduxjs/toolkit";
import {
  cancelPayment,
  checkPaymentStatus,
  confirmPayment,
  getPaymentMethods,
  initiatePayment,
  requestRefund,
} from "./operationPayment";

const paymentReducer = createSlice({
  name: "payment",
  initialState: {
    payment: null,
    status: null,
    error: null,
    isLoading: false,
    paymentMethods: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initiatePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.payment = action.payload;
        state.status = "pending";
        state.isLoading = false;
        state.error = null;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      .addCase(checkPaymentStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkPaymentStatus.fulfilled, (state, action) => {
        state.status = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(checkPaymentStatus.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      .addCase(confirmPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmPayment.fulfilled, (state, action) => {
        state.payment = action.payload;
        state.status = "paid";
        state.isLoading = false;
        state.error = null;
      })
      .addCase(confirmPayment.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(cancelPayment.fulfilled, (state, action) => {
        state.payment = action.payload;
        state.status = "cancelled";
      })

      // ✅ 5️⃣ Запит на повернення грошей
      .addCase(requestRefund.fulfilled, (state, action) => {
        state.payment = action.payload;
        state.status = "refund_requested";
      })

      // ✅ 6️⃣ Отримати доступні методи оплати
      .addCase(getPaymentMethods.fulfilled, (state, action) => {
        state.paymentMethods = action.payload;
      });
  },
});

export default paymentReducer.reducer;
