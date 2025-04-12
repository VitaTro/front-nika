import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

// Отримати товари з кошика
export const getShoppingCart = createAsyncThunk(
  "shoppingCart/getShoppingCart",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/user/shopping-cart");
      return response.data.products || []; // Повертаємо список продуктів
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Додати товар до кошика
export const addProductToShoppingCart = createAsyncThunk(
  "shoppingCart/addProduct",
  async (productData, thunkAPI) => {
    try {
      const response = await axios.post(
        "/api/user/shopping-cart/add",
        productData
      );
      return response.data.product; // Повертаємо доданий продукт
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Видалити товар із кошика
export const removeProductFromShoppingCart = createAsyncThunk(
  "shoppingCart/removeProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/api/user/shopping-cart/remove/${productId}`
      );
      if (response.status !== 200) {
        throw new Error("Failed to delete product from shopping cart");
      }
      return productId; // Повертаємо ID видаленого продукту
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
