import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

// Створити нове замовлення користувача
export const createUserOrder = createAsyncThunk(
  "orders/createUserOrder",
  async (orderData, thunkAPI) => {
    try {
      const response = await axios.post("/api/user/orders", orderData);
      return response.data; // Повертаємо створене замовлення
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Отримати історію покупок користувача
export const fetchPurchaseHistory = createAsyncThunk(
  "user/fetchPurchaseHistory",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/user/purchase-history");
      return response.data; // Повертаємо історію покупок
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
