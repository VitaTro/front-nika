import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

// Отримати всі handmade картки
export const fetchHandmadeCards = createAsyncThunk(
  "admin/fetchHandmadeCards",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/admin/handmade");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const fetchHandmadeCardById = createAsyncThunk(
  "admin/fetchHandmadeCardById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/api/admin/handmade/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
// Створити handmade картку
export const addHandmadeCard = createAsyncThunk(
  "admin/addHandmadeCard",
  async (handmadeData, thunkAPI) => {
    try {
      const response = await axios.post("/api/admin/handmade", handmadeData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Оновити handmade картку
export const updateHandmadeCard = createAsyncThunk(
  "admin/updateHandmadeCard",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/api/admin/handmade/${id}`,
        updatedData,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Видалити handmade картку
export const deleteHandmadeCard = createAsyncThunk(
  "admin/deleteHandmadeCard",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/api/admin/handmade/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const createProductFromHandmade = createAsyncThunk(
  "admin/createProductFromHandmade",
  async ({ handmadeId, name, price }, thunkAPI) => {
    try {
      const response = await axios.post(
        `/api/admin/handmade/${handmadeId}/create-product`,
        { name, price },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
