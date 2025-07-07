import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

export const uploadBulkMovements = createAsyncThunk(
  "bulkUpload/uploadBulkMovements",
  async (movementsData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/admin/stock/movement/bulk", {
        movements: movementsData,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Помилка при імпорті"
      );
    }
  }
);
