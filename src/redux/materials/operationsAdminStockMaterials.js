import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";
export const fetchAdminStockMaterials = createAsyncThunk(
  "admin/fetchStockMaterials",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/admin/materials/stock");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addAdminStockMaterials = createAsyncThunk(
  "admin/addStockMovement",
  async (movementData, thunkAPI) => {
    try {
      const response = await axios.post(
        "/api/admin/materials/stock",
        movementData,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteAdminStockMovement = createAsyncThunk(
  "admin/deleteStockMovement",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/api/admin/materials/stock/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
