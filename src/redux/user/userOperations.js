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
export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async (_, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) throw new Error("❌ No tokens found");

      console.log("🔄 Restoring session with access token:", accessToken);

      const { data: userData } = await axios.get("/api/user/profile/info", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return { accessToken, refreshToken, user: userData };
    } catch (error) {
      console.error("⚠️ Access token expired, trying refresh...");
      return thunkAPI.dispatch(refreshSession());
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

export const getUserProducts = createAsyncThunk(
  "products/getUserProducts",
  async (type, thunkAPI) => {
    // ✅ Передаємо `type`
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("/api/user/products", {
        headers: { Authorization: `Bearer ${token}` },
        params: { type }, // ✅ Передаємо `type`
      });

      console.log(`🔄 Fetching user products of type: ${type}`);
      console.log("✅ API Response in getUserProducts:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Unexpected error"
      );
    }
  }
);

export const getUserProductsById = createAsyncThunk(
  "products/getUserProductsById",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`/api/user/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("🔄 API Response in getUserProductsById:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Unexpected error"
      );
    }
  }
);
export const fetchWallet = createAsyncThunk(
  "user/fetchWallet",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/user/wallet");
      return data.wallet;
    } catch (error) {
      return rejectWithValue("Failed to fetch wallet balance");
    }
  }
);
export const fetchUserSettings = createAsyncThunk(
  "user/fetchSettings",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/user/settings");
      return data;
    } catch (error) {
      return rejectWithValue("Failed to load settings");
    }
  }
);
export const updateUserSettings = createAsyncThunk(
  "user/updateSettings",
  async (newSettings, { rejectWithValue }) => {
    try {
      const { data } = await axios.put("/api/user/settings", newSettings);
      return data;
    } catch (error) {
      return rejectWithValue("Failed to update settings");
    }
  }
);
