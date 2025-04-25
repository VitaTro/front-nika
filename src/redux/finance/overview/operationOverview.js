import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

// Асинхронний Thunk для отримання огляду
export const fetchFinanceOverview = createAsyncThunk(
  "finance/fetchOverview",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/admin/finance/overview");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
