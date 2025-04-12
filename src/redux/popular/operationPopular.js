import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

// Отримати популярні продукти
export const getPopularProducts = createAsyncThunk(
  "popular/getPopularProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/api/products/popular`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
