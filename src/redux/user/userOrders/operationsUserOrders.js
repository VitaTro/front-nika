import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";
import {
  selectShoppingCartItems,
  selectTotalAmount,
} from "../../shopping/selectorsShopping";

export const fetchUserOrders = createAsyncThunk(
  "userOrders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/user/orders");
      console.log("🚀 Отримані замовлення:", response.data);
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
  async ({ paymentMethod }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const products = selectShoppingCartItems(state);
      const pickupPointId = state.inPost.selectedPickupPoint;

      if (!products || products.length === 0) {
        return rejectWithValue("Кошик порожній, неможливо оформити замовлення");
      }
      if (!pickupPointId) {
        return rejectWithValue("Не вибрано пункт видачі");
      }
      if (!["blik", "transfer"].includes(paymentMethod)) {
        return rejectWithValue("Неправильний спосіб оплати");
      }

      const response = await axios.post("/api/user/orders", {
        products,
        totalPrice: selectTotalAmount(state),
        paymentMethod, // ✅ Передаємо вибраний спосіб оплати
        pickupPointId,
      });

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

export const trackOrder = createAsyncThunk(
  "userOrders/trackOrder",
  async (trackingNumber, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/user/orders/track/${trackingNumber}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
