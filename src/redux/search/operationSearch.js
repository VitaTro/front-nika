import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

// Пошук продуктів
export const searchProducts = createAsyncThunk(
  "search/searchProducts",
  async (query, thunkAPI) => {
    try {
      const response = await axios.get(`/api/search`, {
        params: { query: query },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
