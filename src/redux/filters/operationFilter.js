import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

// Застосування фільтрів
export const applyFilters = createAsyncThunk(
  "filters/applyFilters",
  async (filterData, thunkAPI) => {
    try {
      const response = await axios.post(`/api/products/filters`, filterData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
