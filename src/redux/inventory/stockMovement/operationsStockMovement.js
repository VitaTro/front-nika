import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

export const fetchStockMovements = createAsyncThunk(
  "stockMovement/fetchStockMovements",
  async (_, { rejectWithValue }) => {
    try {
      console.log("🌐 API CALL: GET /api/admin/stock/movement");
      const res = await axios.get("/api/admin/stock/movement");
      console.log("🟢 Data received:", res.data);
      return res.data;
    } catch (err) {
      console.error("🔴 API ERROR:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.error || "Не вдалося завантажити рухи"
      );
    }
  }
);
export const uploadSingleMovement = createAsyncThunk(
  "stockMovement/uploadSingleMovement",
  async (movementData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/admin/stock/movement",
        movementData
      );

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
