import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

// Перевірка адміністратора
export const checkAdmin = createAsyncThunk(
  "auth/checkAdmin",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/auth/check-admin");
      return response.data; // Повертаємо результат перевірки
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Реєстрація користувача
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/api/register/user", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Реєстрація адміністратора
export const registerAdmin = createAsyncThunk(
  "auth/registerAdmin",
  async (adminData, thunkAPI) => {
    try {
      const response = await axios.post("/api/register/admin", adminData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/login", credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Логаут
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/api/auth/logout");
    return null; // Логаут завершено
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Скидання пароля
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/reset-password", { email });
      return response.data; // Лінк для скидання пароля надіслано
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Оновлення пароля
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({ token, newPassword }, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/update-password", {
        token,
        newPassword,
      });
      return response.data; // Пароль оновлено
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Оновлення токена
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (refreshToken, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/refresh-token", {
        refreshToken,
      });
      return response.data; // Новий токен
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Отримання даних користувача
export const fetchAuthUser = createAsyncThunk(
  "auth/fetchAuthUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/auth/user");
      return response.data; // Дані користувача
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
