import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

export const fetchAdminRegister = createAsyncThunk(
  "adminAuth/fetchAdminRegister",
  async (adminData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/admin/auth/register", adminData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAdminLogin = createAsyncThunk(
  "adminAuth/fetchAdminLogin",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/admin/auth/login", loginData);
      localStorage.setItem("adminToken", data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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

// 🔥 Вихід адміністратора (логіка на фронті)
export const logoutAdmin = createAsyncThunk(
  "adminAuth/logoutAdmin",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/api/admin/auth/logout");
      localStorage.removeItem("adminToken"); // Очищаємо токен
      return { message: "Logout successful" };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
