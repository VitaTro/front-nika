import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

// Отримати список користувачів
export const fetchAdminUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/admin/users");
      return response.data; // Повертаємо список користувачів
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Видалити користувача
export const deleteAdminUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/api/admin/users/${id}`);
      return id; // Повертаємо ID видаленого користувача
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// подивитись список всіх продуктів
export const fetchAdminProducts = createAsyncThunk(
  "admin/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/admin/products");
      return response.data; // Повертаємо список продуктів
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Додати новий продукт
export const addAdminProduct = createAsyncThunk(
  "admin/addProduct",
  async (productData, thunkAPI) => {
    try {
      const response = await axios.post("/api/admin/products", productData);
      return response.data; // Повертаємо доданий продукт
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Видалити продукт
export const deleteAdminProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/api/admin/products/${id}`);
      return id; // Повертаємо ID видаленого продукту
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
// змінити дані продукту
export const updateAdminProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/api/admin/products/${id}`,
        updatedData,
      );
      console.log("📦 Надсилаємо запит:", id, updatedData);
      return response.data; // Повертаємо оновлені дані товару
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Отримати Dashboard
export const fetchAdminDashboard = createAsyncThunk(
  "admin/fetchDashboard",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/admin/dashboard");
      console.log("🔥 Dashboard Response:", response.data); // Дебагінг
      return response.data; // Повертаємо дані Dashboard
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const fetchAdminMaterials = createAsyncThunk(
  "admin/fetchMaterials",
  async () => {
    const response = await axios.get("/api/admin/materials");
    return response.data;
  },
);

export const addAdminMaterial = createAsyncThunk(
  "admin/addMaterial",
  async (material) => {
    const response = await axios.post("/api/admin/materials", material);
    return response.data;
  },
);

export const updateAdminMaterial = createAsyncThunk(
  "admin/updateMaterial",
  async ({ id, updatedData }) => {
    const response = await axios.put(`/api/admin/materials/${id}`, updatedData);
    return response.data;
  },
);

export const deleteAdminMaterial = createAsyncThunk(
  "admin/deleteMaterial",
  async (id) => {
    await axios.delete(`/api/admin/materials/${id}`);
    return id;
  },
);
