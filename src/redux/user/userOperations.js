import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/user/profile");
      return response.data; // Дані профілю
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchMainData = createAsyncThunk(
  "user/fetchMainData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/user/main", {
        headers: {
          Authorization: `Bearer ${yourToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const uploadUserAvatar = createAsyncThunk(
  "user/uploadAvatar",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await axios.post("/api/user/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Отримати історію покупок
export const fetchPurchaseHistory = createAsyncThunk(
  "user/fetchPurchaseHistory",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/user/purchase-history");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateUserPreferences = createAsyncThunk(
  "user/updatePreferences",
  async (preferences, thunkAPI) => {
    try {
      const response = await axios.post("/api/user/preferences", preferences);
      return response.data; // Повертаємо оновлені уподобання
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (profileData, thunkAPI) => {
    try {
      const response = await axios.put("/api/user/profile", profileData);
      return response.data; // Повертаємо оновлені дані профілю
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
