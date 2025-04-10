import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://nika-gold-back-fe0ff35469d7.herokuapp.com/";

export const getProductsList = createAsyncThunk(
  "products/getProductsList",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`api/products/`);
      return data?.data?.categories || [];
    } catch (error) {
      console.error("Error fetching products:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
