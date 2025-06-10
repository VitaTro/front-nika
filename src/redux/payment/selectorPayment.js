import { createSelector } from "@reduxjs/toolkit";

export const selectPayment = (state) => state.payment.payment;
export const selectPaymentStatus = (state) => state.payment.status;
export const selectPaymentError = (state) => state.payment.error;

// ✅ Якщо потрібно отримати специфічний статус
export const selectIsPaymentPending = createSelector(
  [selectPaymentStatus],
  (status) => status === "pending"
);
export const selectIsPaymentSuccessful = createSelector(
  [selectPaymentStatus],
  (status) => status === "paid"
);
export const selectIsRefundRequested = createSelector(
  [selectPaymentStatus],
  (status) => status === "refund_requested"
);
