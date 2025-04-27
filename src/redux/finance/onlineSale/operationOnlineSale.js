import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

// Отримати всі онлайн-продажі
export const fetchOnlineSales = createAsyncThunk(
  "onlineSales/fetchOnlineSales",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/admin/finance/online/sales", {
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

// Створити новий онлайн-продаж
export const createOnlineSale = createAsyncThunk(
  "onlineSales/createOnlineSale",
  async (saleData, thunkAPI) => {
    try {
      const response = await axios.post(
        "/api/admin/finance/online/sales",
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

// Оновити дані онлайн-продажу
export const updateOnlineSale = createAsyncThunk(
  "onlineSales/updateOnlineSale",
  async ({ saleId, updatedData }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/api/admin/finance/online/sales/${saleId}`,
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
