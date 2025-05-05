import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

export const fetchOfflineOrders = createAsyncThunk(
  "offlineOrders/fetchOfflineOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/admin/finance/offline/orders");
      console.log("📊 API Response:", response.data); // ✅ Перевіряємо структуру

      return Array.isArray(response.data) ? response.data : []; // 🔥 Переконаємось, що це масив
    } catch (error) {
      console.error("❌ API Error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createOfflineOrder = createAsyncThunk(
  "offlineOrders/createOfflineOrder",
  async (newOrderData, { rejectWithValue }) => {
    try {
      console.log(
        "📡 Sending createOfflineOrder request:",
        JSON.stringify(newOrderData, null, 2)
      );
      const response = await axios.post(
        "/api/admin/finance/offline/orders",
        newOrderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(
        "✅ createOfflineOrder API RESPONSE:",
        JSON.stringify(response.data, null, 2)
      );
      return response.data;
    } catch (error) {
      console.error(
        "❌ API Error:",
        JSON.stringify(error.response.data, null, 2)
      );
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Запит на оновлення статусу замовлення
export const updateOfflineOrderStatus = createAsyncThunk(
  "offlineOrders/updateOfflineOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/admin/finance/offline/orders/${orderId}`,
        { status } // 🔥 Відправляємо лише статус
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
