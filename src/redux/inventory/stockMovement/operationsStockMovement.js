import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

export const fetchStockMovements = createAsyncThunk(
  "stockMovement/fetchStockMovements",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/admin/stock/movement");
      return res.data;
    } catch (err) {
      console.error("🔴 API ERROR:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.error || "Не вдалося завантажити рухи"
      );
    }
  }
);

// ✅ Звичайне створення одиночного руху
export const uploadSingleMovement = createAsyncThunk(
  "stockMovement/uploadSingleMovement",
  async (movementData, { rejectWithValue }) => {
    try {
      // 📦 Формуємо чистий payload на основі руху з фронту
      const payload = {
        productIndex: movementData.productIndex,
        productName: movementData.productName,
        type: movementData.type,
        quantity: Number(movementData.quantity),
        unitPurchasePrice: Number(movementData.unitPurchasePrice),
        price: Number(movementData.price),
        note: movementData.note,
        date: movementData.date || new Date().toISOString(),
      };

      console.log("📤 Відправка руху:", payload); // ✅ debug log

      const response = await axios.post("/api/admin/stock/movement", payload);
      return response.data.movement;
    } catch (error) {
      console.error("❌ Error uploading movement:", error);
      return rejectWithValue(
        error.response?.data?.error || "Не вдалося додати рух"
      );
    }
  }
);

export const updateMovement = createAsyncThunk(
  "stock/updateMovement",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/admin/stock/movement/${id}`,
        updates
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Не вдалося оновити запис"
      );
    }
  }
);
export const fetchStockSummary = createAsyncThunk(
  "stockMovement/fetchStockSummary",
  async (productIndex, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/admin/stock/movement/index/${productIndex}/summary`
      );
      if (!response.data) {
        return rejectWithValue({
          productIndex,
          error: "Саммері не отримано",
        });
      }
      return { productIndex, data: response.data };
    } catch (error) {
      console.error("🔴 Summary ERROR:", error.response?.data || error.message);
      return rejectWithValue({
        productIndex,
        error: error.response?.data?.error || "Не вдалося отримати саммері",
      });
    }
  }
);

export const deleteMovement = createAsyncThunk(
  "stock/deleteMovement",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/admin/stock/movement/${id}`);
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Не вдалося видалити запис"
      );
    }
  }
);
export const fetchProductMovements = createAsyncThunk(
  "stockMovement/fetchProductMovements",
  async (productIndex, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/admin/stock/movement/product/${productIndex}`
      );
      return { productIndex, data: response.data };
    } catch (error) {
      console.error(
        "🔴 Error fetching product movements:",
        error.response?.data || error.message
      );
      return rejectWithValue({
        productIndex,
        error: error.response?.data?.error || "Не вдалося отримати рухи товару",
      });
    }
  }
);

export const fetchProductSummary = createAsyncThunk(
  "stockMovement/fetchProductSummary",
  async (productIndex, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `/api/admin/stock/movement/index/${productIndex}/summary`
      );
      return { productIndex, data: res.data };
    } catch (err) {
      console.error("❌ Summary fetch error:", err.message);
      return rejectWithValue(err.message);
    }
  }
);
