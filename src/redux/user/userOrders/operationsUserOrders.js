// redux/user/userOrders/operationsUserOrders.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

// ===============================
// GET ALL USER ORDERS
// ===============================
export const fetchUserOrders = createAsyncThunk(
  "userOrders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/user/orders");
      return data; // бекенд повертає масив замовлень
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ===============================
// CREATE NEW ORDER (CLEAN VERSION)
// ===============================
export const createOrder = createAsyncThunk(
  "userOrders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      // orderData має містити:
      // products, country, pickupPointId, paymentMethod, notes
      const { data } = await axios.post("/api/user/orders", orderData);
      return data; // повертає { message, order, paymentUrl }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ===============================
// RETURN ORDER
// ===============================
export const returnOrder = createAsyncThunk(
  "userOrders/returnOrder",
  async ({ orderId, returnedProducts, refundAmount }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/user/orders/${orderId}/return`, {
        returnedProducts,
        refundAmount,
      });
      return data.order;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ===============================
// CONFIRM RECEIVED
// ===============================
export const confirmOrderReceived = createAsyncThunk(
  "userOrders/confirmReceived",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `/api/user/orders/${orderId}/received`,
      );
      return data.order;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ===============================
// PURCHASE HISTORY
// ===============================
export const fetchPurchaseHistory = createAsyncThunk(
  "userOrders/fetchPurchaseHistory",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/user/orders/purchase-history");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
// ===============================
// GET SINGLE USER ORDER
// ===============================
export const fetchUserOrderById = createAsyncThunk(
  "userOrders/fetchOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/user/orders/${orderId}`);
      return data.order; // бекенд повертає { order }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
