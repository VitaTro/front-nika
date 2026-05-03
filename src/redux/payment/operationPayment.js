import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

const PAYMENT_METHODS = {
  ELAVON: "elavon_link",
  TRANSFER: "bank_transfer",
};

// ✅ 1️⃣ Ініціація платежу
export const initiatePayment = createAsyncThunk(
  "payment/initiate",
  async ({ orderId, paymentMethod }, { rejectWithValue }) => {
    // 🔹 Перевіряємо, чи метод оплати коректний
    if (!Object.values(PAYMENT_METHODS).includes(paymentMethod)) {
      return rejectWithValue("Nieprawidłowy metod opłaty");
    }
    try {
      const { data } = await axios.post(`/api/user/payments/initiate`, {
        orderId,
        paymentMethod,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Błąd inicjacji płatności",
      );
    }
  },
);

// ✅ 2️⃣ Перевірка статусу платежу
export const checkPaymentStatus = createAsyncThunk(
  "payment/status",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/user/payments/status/${orderId}`);
      return data.status;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Błąd weryfikacji statusu płatności",
      );
    }
  },
);

// ✅ 3️⃣ Підтвердження оплати
export const confirmPayment = createAsyncThunk(
  "payment/confirm",
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `/api/user/payments/confirm/${orderId}`,
      );
      return data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Błąd potwierdzenia płatności",
      );
    }
  },
);

// ✅ 4️⃣ Скасування платежу
export const cancelPayment = createAsyncThunk(
  "payment/cancel",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/user/payments/cancel/${orderId}`);
      return data.payment;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Błąd anulowania płatności",
      );
    }
  },
);

// ✅ 5️⃣ Запит на повернення грошей
export const requestRefund = createAsyncThunk(
  "payment/refund",
  async ({ orderId, refundAmount }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `/api/user/payments/refund/${orderId}`,
        {
          refundAmount,
        },
      );
      return data.payment;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Błąd zwrotu pieniędzyв");
    }
  },
);

// ✅ 6️⃣ Отримати доступні методи оплати
export const getPaymentMethods = createAsyncThunk(
  "payment/methods",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/user/payments/methods`);
      return data.methods;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Błąd pobierania metod płatności",
      );
    }
  },
);
