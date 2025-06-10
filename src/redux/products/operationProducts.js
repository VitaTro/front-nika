import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

// Отримати всі продукти
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        console.warn(
          "❌ Unauthorized request: use /api/user/products instead."
        ); // ✅ Логування
        return thunkAPI.rejectWithValue(
          "Unauthorized request. Use /api/user/products instead."
        );
      }

      const response = await axios.get("/api/products");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Додати продукт
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, thunkAPI) => {
    try {
      const response = await axios.post("/api/products", productData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Отримати продукт за типом
export const getProductByType = createAsyncThunk(
  "products/getProductByType",
  async (type, thunkAPI) => {
    try {
      const response = await axios.get(`/api/products/${type}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Отримати продукт за ID
export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Оновити продукт (PATCH)
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.patch(`/api/products/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Видалити продукт (DELETE)
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/products/${id}`);
      if (response.status !== 200) {
        throw new Error("Failed to delete product");
      }
      return id; // Повертаємо ID видаленого продукту
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
