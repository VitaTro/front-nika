import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

export const fetchFinanceOverview = createAsyncThunk(
  "overview/fetchFinanceOverview",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/admin/finance/overview");
      console.log("🚀 Відповідь бекенду:", response.data);
      if (!response.data.completedSales || !response.data.lowStockItems) {
        console.warn("⚠️ Дані `completedSales` або `lowStockItems` відсутні!");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createFinanceOverview = createAsyncThunk(
  "overview/createFinanceOverview",
  async (financeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/admin/finance/overview",
        financeData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateFinanceOverview = createAsyncThunk(
  "overview/updateFinanceOverview",
  async (financeData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        "/api/admin/finance/overview",
        financeData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
