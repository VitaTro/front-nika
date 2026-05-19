import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

// Реєстрація користувача
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/api/user/auth/register", userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Bląd rejestracji",
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/api/user/auth/login", credentials, {
        withCredentials: true,
      });
      // localStorage.setItem("token", response.data.accessToken);
      // localStorage.setItem("refreshToken", response.data.refreshToken);

      const { data: userData } = await axios.get("/api/user/profile/info", {
        // headers: { Authorization: `Bearer ${response.data.accessToken}` },
        withCredentials: true,
      });
      return {
        // ...response.data,
        isVerified: response.data.isVerified,
        user: userData,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
      error.response?.data?.message || "Bląd przy wejściu";
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await axios.post("/api/user/auth/logout", {}, { withCredentials: true });
      // localStorage.removeItem("accessToken");
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue("Bląd przy wyjściu");
    }
  },
);

// Скидання пароля
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email, thunkAPI) => {
    try {
      const response = await axios.post(
        "/api/user/auth/reset-password",
        {
          email,
        },
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Błąd resetowania hasła",
      );
    }
  },
);

// Оновлення пароля
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  // async ({ email, resetCode, newPassword, confirmNewPassword }, thunkAPI) => {
  //   try {
  //     const response = await axios.post("/api/user/auth/update-password", {
  //       email,
  //       resetCode,
  //       newPassword,
  //       confirmNewPassword,
  //     });
  //       return response.data;
  //     } catch (error) {
  //       return thunkAPI.rejectWithValue(
  //         error.response?.data?.message || "Помилка оновлення пароля",
  //       );
  //     }
  //   },
  // );
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        "/api/user/auth/update-password",
        payload,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Помилка оновлення пароля");
    }
  },
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, thunkAPI) => {
    try {
      const response = await fetch(
        `/api/user/auth/verify-email?token=${token}`,
        // {
        //   method: "GET",
        // },
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
  },
);

export const checkUserSession = createAsyncThunk(
  "auth/checkSession",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/user/auth/check", {
        withCredentials: true,
      });

      if (!data.isUser) {
        return { isUser: false, user: null };
      }

      return {
        isUser: true,
        user: { id: data.userId },
      };
    } catch (error) {
      return rejectWithValue("Session check failed");
    }
  },
);
