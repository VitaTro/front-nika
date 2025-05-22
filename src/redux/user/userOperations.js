import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

// ✅ Отримати основну інформацію про користувача
export const fetchUserMain = createAsyncThunk(
  "user/fetchMain",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/user/main");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Отримати особисті дані користувача
export const fetchUserInfo = createAsyncThunk(
  "user/fetchInfo",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/user/profile/info");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Оновити особисті дані користувача
export const updateUserInfo = createAsyncThunk(
  "user/updateInfo",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put("/api/user/profile/info", userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Отримати адресу користувача
export const fetchUserAddress = createAsyncThunk(
  "user/fetchAddress",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/user/profile/address");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Оновити адресу користувача
export const updateUserAddress = createAsyncThunk(
  "user/updateAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        "/api/user/profile/address",
        addressData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ❌ Видалити акаунт користувача
export const deleteUserAccount = createAsyncThunk(
  "user/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete("/api/user/profile");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// ✅ Надіслати повідомлення адміну
export const sendAdminMessage = createAsyncThunk(
  "user/sendAdminMessage",
  async ({ subject, message }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/user/profile/email", {
        subject,
        message,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Error sending message"
      );
    }
  }
);

// ✅ Отримати історію переглядів
export const fetchRecentViews = createAsyncThunk(
  "user/fetchRecentViews",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/user/recent");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Error fetching recent views"
      );
    }
  }
);
