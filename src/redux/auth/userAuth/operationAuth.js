import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

// Реєстрація користувача
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/api/user/auth/register", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка реєстрації"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      console.log("🚀 Sending login request:", credentials);

      const response = await axios.post("/api/user/auth/login", credentials);
      console.log("✅ Login response:", response.data);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      const { data: userData } = await axios.get("/api/user/profile/info", {
        headers: { Authorization: `Bearer ${response.data.accessToken}` },
      });
      return {
        ...response.data,
        isVerified: response.data.isVerified,
        user: userData,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await axios.post("/api/user/auth/logout");
      localStorage.removeItem("accessToken");
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка виходу"
      );
    }
  }
);

// Скидання пароля
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email, thunkAPI) => {
    try {
      const response = await axios.post("/api/user/auth/reset-password", {
        email,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка скидання пароля"
      );
    }
  }
);

// Оновлення пароля
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({ email, resetCode, newPassword, confirmNewPassword }, thunkAPI) => {
    try {
      const response = await axios.post("/api/user/auth/update-password", {
        email,
        resetCode,
        newPassword,
        confirmNewPassword,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка оновлення пароля"
      );
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, thunkAPI) => {
    try {
      const response = await fetch(
        `/api/user/auth/verify-email?token=${token}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();

      if (response.ok) {
        return data.message;
      } else {
        return thunkAPI.rejectWithValue(data.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
