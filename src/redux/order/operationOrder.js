import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

// Отримати всі замовлення
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/admin/finance/orders");
      return response.data; // Повертаємо список замовлень
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Отримати окреме замовлення
export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (orderId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/admin/finance/orders/${orderId}`);
      return response.data; // Повертаємо дані конкретного замовлення
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, newStatus }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/api/admin/finance/orders/${orderId}`,
        {
          status: newStatus,
        }
      );
      return response.data; // Повертаємо оновлене замовлення
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Створити нове замовлення
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, thunkAPI) => {
    try {
      const response = await axios.post(`/api/admin/finance/orders`, orderData);
      return response.data; // Повертаємо створене замовлення
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
