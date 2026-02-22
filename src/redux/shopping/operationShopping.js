import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

// Отримати товари з кошика
// ✅ Отримати всі товари з кошика
export const getShoppingCart = createAsyncThunk(
  "shoppingCart/get",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/user/shopping-cart");
      return data.cart; // ✅ Повертаємо список товарів
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// ✅ Додати товар у кошик
export const addProductToShoppingCart = createAsyncThunk(
  "shoppingCart/add",
  async ({ productId, quantity = 1 }, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/user/shopping-cart/add", {
        productId,
        quantity,
      });
      return data.item; // ✅ Повертаємо доданий товар
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// ✅ Оновити кількість товару
export const updateProductToShoppingCart = createAsyncThunk(
  "shoppingCart/update",
  async ({ id, quantity }, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `/api/user/shopping-cart/update/${id}`,
        { quantity },
      );
      return data.item; // ✅ Повертаємо оновлений товар
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// ✅ Видалити товар із кошика
export const removeProductFromShoppingCart = createAsyncThunk(
  "shoppingCart/remove",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/api/user/shopping-cart/remove/${id}`);
      return id; // ✅ Повертаємо ID видаленого товару
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// ✅ Перемістити товар у вішліст
export const moveProductToWishlist = createAsyncThunk(
  "shoppingCart/moveToWishlist",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `/api/user/shopping-cart/move-to-wishlist/${id}`,
      );

      return data.item;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
