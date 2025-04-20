import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

// Отримати товари з кошика
export const getShoppingCart = createAsyncThunk(
  "shoppingCart/getShoppingCart",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/shopping-cart");
      console.log("Fetched shopping cart data:", data);
      // Сортування за часом додавання (нові зверху)
      const sortedShopping = (data.cart || []).sort(
        (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
      );
      return sortedShopping; // Повертаємо список продуктів
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Додати товар до кошика
export const addProductToShoppingCart = createAsyncThunk(
  "shoppingCart/addProduct",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/shopping-cart/add", {
        productId,
        quantity,
      });
      return data.item; // Повертаємо доданий продукт
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
      console.log("Sending DELETE request for productId:", productId); // Логування
      const response = await axios.delete(
        `/api/shopping-cart/remove/${productId}`
      );
      if (response.status !== 200) {
        throw new Error("Failed to delete product from shopping cart");
      }
      return productId; // Повертаємо ID видаленого продукту
    } catch (error) {
      console.error("Error removing product:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateProductToShoppingCart = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `/api/shopping-cart/update/${productId}`,
        { quantity }
      );
      return data.item; // Сервер повертає оновлений продукт
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
