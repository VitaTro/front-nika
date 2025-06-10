import { createAsyncThunk } from "@reduxjs/toolkit";

// ✅ 1️⃣ Ініціація платежу
export const initiatePayment = createAsyncThunk(
  "payment/initiate",
  async ({ orderId, amount, paymentMethod }, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/user/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, amount, paymentMethod }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      return data.payment;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ 2️⃣ Перевірка статусу платежу
export const checkPaymentStatus = createAsyncThunk(
  "payment/status",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/user/payments/status/${orderId}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      return data.status;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ 3️⃣ Підтвердження оплати
export const confirmPayment = createAsyncThunk(
  "payment/confirm",
  async ({ orderId, paymentCode }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/user/payments/confirm/${orderId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentCode }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      return data.userInvoice;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
