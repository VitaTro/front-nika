import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

export const createPlatformOrder = createAsyncThunk(
  "platform/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "/api/admin/finance/platform-orders",
        orderData
      );
      return res.data.order;
    } catch (err) {
      return rejectWithValue(
        err.response.data.error || "Не вдалося створити замовлення"
      );
    }
  }
);

export const createPlatformSale = createAsyncThunk(
  "platform/createSale",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "/api/admin/finance/platform-sales",
        payload
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server error");
    }
  }
);
// Отримати всі платформи замовлень
export const fetchPlatformOrders = createAsyncThunk(
  "platform/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/admin/finance/platform-orders");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server error");
    }
  }
);

// Отримати одне замовлення по ID
export const fetchPlatformOrderById = createAsyncThunk(
  "platform/fetchOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/admin/finance/platform-orders/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server error");
    }
  }
);

// Аналогічно для продажів:
export const fetchPlatformSales = createAsyncThunk(
  "platform/fetchSales",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/admin/finance/platform-sales");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server error");
    }
  }
);

export const fetchPlatformSaleById = createAsyncThunk(
  "platform/fetchSaleById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/admin/finance/platform-sales/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server error");
    }
  }
);
export const updatePlatformOrderStatus = createAsyncThunk(
  "platformOrders/updateStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/api/admin/finance/platform-orders/${id}`,
        { status }
      );
      return response.data.order;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const returnPlatformSale = createAsyncThunk(
  "platform/returnSale",
  async ({ id, returnData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `/api/admin/finance/platform-sales/${id}`,
        returnData
      );
      return res.data.sale;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server error");
    }
  }
);
