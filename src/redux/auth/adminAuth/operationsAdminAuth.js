import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

export const fetchAdminRegister = createAsyncThunk(
  "adminAuth/fetchAdminRegister",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/admin/auth/register", {
        ...adminData,
        adminSecret: process.env.ADMIN_SECRET_KEY, // Додай ключ у запит
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAdminLogin = createAsyncThunk(
  "adminAuth/fetchAdminLogin",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/admin/auth/login", adminData);

      if (!response.data.token) {
        throw new Error("❌ No token received from server!");
      }

      localStorage.setItem("adminToken", response.data.token); // Використовуємо `token`
      localStorage.setItem("refreshToken", response.data.refreshToken);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const sendAdminEmail = createAsyncThunk(
  "adminAuth/sendAdminEmail",
  async (emailData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/admin/auth/send-email",
        emailData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutAdmin = createAsyncThunk(
  "adminAuth/logoutAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/admin/auth/logout");
      // localStorage.removeItem("adminToken"); // Очищаємо токен
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
