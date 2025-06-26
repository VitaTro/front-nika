import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

export const fetchPublicMain = createAsyncThunk(
  "main/fetchPublicMain",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/main");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Error with loading..");
    }
  }
);
