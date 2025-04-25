import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

export const fetchSales = createAsyncThunk(
  "sales/fetchSales",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/admin/finance/sale");
      return response.data; // Повертаємо список замовлень
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createSales = createAsyncThunk(
  "sales/createSales",
  async (saleData, thunkAPI) => {
    try {
      const response = await axios.post(`/api/admin/finance/sale`, saleData);
      return response.data; // Повертаємо створене замовлення
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateSalesStatus = createAsyncThunk(
  "sales/updateSalesStatus",
  async ({ saleId, newStatus }, thunkAPI) => {
    try {
      const response = await axios.patch(`/api/admin/finance/sale/${saleId}`, {
        status: newStatus,
      });
      return response.data; // Повертаємо оновлене замовлення
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
