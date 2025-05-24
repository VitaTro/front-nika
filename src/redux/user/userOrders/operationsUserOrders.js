import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

export const fetchUserOrders = createAsyncThunk(
  "userOrders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/user/orders");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Фільтри статусів
export const fetchUnpaidOrders = createAsyncThunk(
  "userOrders/fetchUnpaid",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/user/orders/unpaid");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProcessingOrders = createAsyncThunk(
  "userOrders/fetchProcessing",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/user/orders/processing");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchShippedOrders = createAsyncThunk(
  "userOrders/fetchShipped",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/user/orders/shipped");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Створити замовлення
export const createOrder = createAsyncThunk(
  "userOrders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/user/orders", orderData);
      return response.data.order;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Запит на повернення
export const returnOrder = createAsyncThunk(
  "userOrders/returnOrder",
  async ({ orderId, returnedProducts, refundAmount }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/user/orders/${orderId}/return`, {
        returnedProducts,
        refundAmount,
      });
      return response.data.order;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Користувач підтверджує отримання
export const confirmOrderReceived = createAsyncThunk(
  "userOrders/confirmReceived",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/user/orders/${orderId}/received`
      );
      return response.data.order;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Історія покупок
export const fetchPurchaseHistory = createAsyncThunk(
  "userOrders/fetchPurchaseHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/user/orders/purchase-history");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
