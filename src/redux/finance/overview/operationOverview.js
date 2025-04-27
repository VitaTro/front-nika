import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

export const fetchFinanceSettings = createAsyncThunk(
  "finance/fetchOverview",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/admin/finance/overview", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const createFinanceSettings = createAsyncThunk(
  "finance/createSettings",
  async (financeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/admin/finance/overview",
        financeData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateFinanceSettings = createAsyncThunk(
  "finance/updateSettings",
  async (financeData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        "/api/admin/finance/overview",
        financeData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
