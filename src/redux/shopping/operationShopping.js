import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

// Отримати товари з кошика
export const getShoppingCart = createAsyncThunk(
  "shoppingCart/getShoppingCart",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/user/shopping-cart");
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
  async ({ productId, quantity = 1 }, thunkAPI) => {
    try {
      if (quantity < 1) {
        throw new Error("Quantity must be greater than 0");
      }

      const { data } = await axios.post("/api/user/shopping-cart/add", {
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
  async (id, thunkAPI) => {
    console.log("Sending DELETE request for ID:", id); // Лог
    try {
      const response = await axios.delete(
        `/api/user/shopping-cart/remove/${id}`
      );
      if (response.status !== 200) {
        throw new Error("Failed to delete product from shopping cart");
      }
      return id; // Повертаємо `_id` видаленого продукту
    } catch (error) {
      console.error("Error removing product:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateProductToShoppingCart = createAsyncThunk(
  "cart/updateCartItem",
  async ({ id, quantity }, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `/api/user/shopping-cart/update/${id}`,
        {
          quantity,
        }
      );
      return data.item; // Сервер повертає оновлений продукт
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const moveProductToWishlist = createAsyncThunk(
  "shoppingCart/moveToWishlist",
  async (id, thunkAPI) => {
    console.log(
      "Sending POST request to move product to wishlist with ID:",
      id
    );
    try {
      const { data } = await axios.post(
        `/api/user/shopping-cart/move-to-wishlist/${id}`
      );
      return data.item; // Повертаємо переміщений товар
    } catch (error) {
      console.error("Error moving product to wishlist:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
