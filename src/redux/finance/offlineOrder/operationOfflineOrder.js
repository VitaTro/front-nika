import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

// Отримати всі офлайн-замовлення
export const fetchOfflineOrders = createAsyncThunk(
  "offlineOrders/fetchOfflineOrders",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/admin/finance/offline/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Створити нове офлайн-замовлення
export const createOfflineOrder = createAsyncThunk(
  "offlineOrders/createOfflineOrder",
  async (orderData, thunkAPI) => {
    try {
      const response = await axios.post(
        "/api/admin/finance/offline/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Оновити статус офлайн-замовлення
export const updateOfflineOrderStatus = createAsyncThunk(
  "offlineOrders/updateOfflineOrderStatus",
  async ({ orderId, newStatus }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/api/admin/finance/offline/orders/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
