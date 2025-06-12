import { createSelector } from "@reduxjs/toolkit";

// 🔹 Отримати дані про оплату
export const selectPayment = (state) => state.payment.payment;

// 🔹 Отримати статус оплати
export const selectPaymentStatus = (state) => state.payment.status;

// 🔹 Отримати помилки
export const selectPaymentError = (state) => state.payment.error;

// 🔹 Отримати доступні методи оплати
export const selectPaymentMethods = (state) => state.payment.paymentMethods;

// ✅ Перевірити, чи оплата в очікуванні
export const selectIsPaymentPending = createSelector(
  [selectPaymentStatus],
  (status) => status === "pending"
);

// ✅ Перевірити, чи оплата успішна
export const selectIsPaymentSuccessful = createSelector(
  [selectPaymentStatus],
  (status) => status === "paid"
);

// ✅ Перевірити, чи був запит на повернення коштів
export const selectIsRefundRequested = createSelector(
  [selectPaymentStatus],
  (status) => status === "refund_requested"
);
