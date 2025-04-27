import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

// Отримати всі офлайн-продажі
export const fetchOfflineSales = createAsyncThunk(
  "offlineSales/fetchOfflineSales",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/admin/finance/offline/sales", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Створити новий офлайн-продаж
export const createOfflineSale = createAsyncThunk(
  "offlineSales/createOfflineSale",
  async (saleData, thunkAPI) => {
    try {
      const response = await axios.post(
        "/api/admin/finance/offline/sales",
        saleData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Оновити дані офлайн-продажу
export const updateOfflineSale = createAsyncThunk(
  "offlineSales/updateOfflineSale",
  async ({ saleId, updatedData }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/api/admin/finance/offline/sales/${saleId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
