import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

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
  },
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
  },
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
  },
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
  },
);

// ✅ Створити замовлення
export const createOrder = createAsyncThunk(
  "userOrders/createOrder",
  async (
    { formData, cleanedProducts, totalPrice, finalPrice },
    { rejectWithValue },
  ) => {
    try {
      const {
        paymentMethod,
        pickupPointId,
        deliveryType,
        deliveryAddress,
        smartboxDetails,
        notes,
      } = formData;

      if (!cleanedProducts || !cleanedProducts.length) {
        return rejectWithValue(
          "🛒 The basket is empty, it is not possible to place an order.",
        );
      }

      if (deliveryType === "pickup" && !pickupPointId) {
        return rejectWithValue("📦 No pickup point selected");
      }

      if (deliveryType === "courier") {
        const { postalCode, city, street, houseNumber } = deliveryAddress || {};
        if (!postalCode || !city || !street || !houseNumber) {
          return rejectWithValue(
            "🏠 Please fill in all the required fields of the delivery address.",
          );
        }
      }

      if (deliveryType === "smartbox") {
        if (!smartboxDetails?.boxId || !smartboxDetails?.location) {
          return rejectWithValue("📬 Specify the details of the parcel locker");
        }
      }

      const response = await axios.post("/api/user/orders", {
        products: cleanedProducts,
        totalPrice,
        paymentMethod,
        pickupPointId,
        deliveryType,
        deliveryAddress,
        smartboxDetails,
        notes,
        finalPrice,
      });

      return response.data.order;
    } catch (error) {
      const message =
        error.response?.data?.error || "❌ Order creation failed on server";
      return rejectWithValue(message);
    }
  },
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
  },
);

// ✅ Користувач підтверджує отримання
export const confirmOrderReceived = createAsyncThunk(
  "userOrders/confirmReceived",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/user/orders/${orderId}/received`,
      );
      return response.data.order;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
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
  },
);

export const trackOrder = createAsyncThunk(
  "userOrders/trackOrder",
  async (trackingNumber, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/user/orders/track/${trackingNumber}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchPickupPoints = createAsyncThunk(
  "pickupPoints/fetchPoints",
  async (_, { rejectWithValue }) => {
    console.log(response.data.items);
    try {
      const response = await axios.get("/api/user/orders/pickup-points");
      console.log("🔥 Отримані точки з API:", response.data.items);
      return response.data.items;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
