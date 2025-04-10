import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://nika-gold-back-fe0ff35469d7.herokuapp.com/";

export const getPopularProducts = createAsyncThunk(
  "products/getPopular",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`api/products/popular/`);
      return data?.data?.categories || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
