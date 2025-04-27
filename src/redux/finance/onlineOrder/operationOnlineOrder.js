import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

// Отримати всі замовлення
export const fetchOnlineOrders = createAsyncThunk(
  "onlineOrders/fetchOnlineOrders",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/admin/finance/online/orders");
      return response.data; // Повертаємо список замовлень
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Створити нове замовлення
export const createOnlineOrder = createAsyncThunk(
  "onlineOrders/createOnlineOrder",
  async (orderData, thunkAPI) => {
    try {
      const response = await axios.post(
        `/api/admin/finance/online/orders`,
        orderData
      );
      return {
        success: true,
        order: response.data,
      }; // Повертаємо створене замовлення
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Отримати окреме замовлення
export const fetchOnlineOrderById = createAsyncThunk(
  "onlineOrders/fetchOnlineOrderById",
  async (orderId, thunkAPI) => {
    try {
      const response = await axios.get(
        `/api/admin/finance/online/orders/${orderId}`
      );
      return response.data; // Повертаємо дані конкретного замовлення
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//Редагувати окреме замовлення
export const updateOnlineOrderStatus = createAsyncThunk(
  "onlineOrders/updateOnlineOrderStatus",
  async ({ orderId, newStatus }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/api/admin/finance/online/orders/${orderId}`,
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
