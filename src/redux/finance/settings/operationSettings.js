import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

export const fetchFinanceSettings = createAsyncThunk(
  "financeSettings/fetchFinanceSettings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/admin/finance/settings");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching finance settings"
      );
    }
  }
);

export const updateFinanceSettings = createAsyncThunk(
  "financeSettings/updateFinanceSettings",
  async (updatedData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        "/api/admin/finance/settings",
        updatedData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error updating finance settings"
      );
    }
  }
);
