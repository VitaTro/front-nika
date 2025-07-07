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
