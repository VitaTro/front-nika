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
    paymentId: null, // ID платежу з бекенду
    payLink: null, // URL Elavon
    bankDetails: null, // Дані для переказу
    status: null, // pending / paid / cancelled / refund_requested
    error: null,
    isLoading: false,
    paymentMethods: [], // ["elavon_link", "bank_transfer"]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ============================
      // INITIATE PAYMENT
      // ============================
      .addCase(initiatePayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        // Бекенд повертає:
        // { payLink, bankDetails, paymentId }
        state.paymentId = action.payload.paymentId || null;
        state.payLink = action.payload.payLink || null;
        state.bankDetails = action.payload.bankDetails || null;

        state.status = "pending";
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      // ============================
      // CHECK PAYMENT STATUS
      // ============================
      .addCase(checkPaymentStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkPaymentStatus.fulfilled, (state, action) => {
        state.status = action.payload; // "pending" | "paid" | ...
        state.isLoading = false;
        state.error = null;
      })
      .addCase(checkPaymentStatus.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      // ============================
      // CONFIRM PAYMENT (bank transfer only)
      // ============================
      .addCase(confirmPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmPayment.fulfilled, (state) => {
        state.status = "paid";
        state.isLoading = false;
        state.error = null;
      })
      .addCase(confirmPayment.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      // ============================
      // CANCEL PAYMENT
      // ============================
      .addCase(cancelPayment.fulfilled, (state) => {
        state.status = "cancelled";
      })

      // ============================
      // REFUND REQUEST
      // ============================
      .addCase(requestRefund.fulfilled, (state) => {
        state.status = "refund_requested";
      })

      // ============================
      // GET PAYMENT METHODS
      // ============================
      .addCase(getPaymentMethods.fulfilled, (state, action) => {
        state.paymentMethods = action.payload;
      });
  },
});

export default paymentReducer.reducer;
