import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

export const getSearchProducts = createAsyncThunk(
  "products/search",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`api/products/search`, {
        params: { query: searchTerm },
      });

      return data?.products || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
