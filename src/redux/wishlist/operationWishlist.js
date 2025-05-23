import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`api/user/wishlist`);

      // Сортування за часом додавання (нові зверху)
      const sortedWishlist = (data.wishlist || []).sort(
        (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
      );

      return sortedWishlist;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProductToWishlist = createAsyncThunk(
  "wishlist/addProduct",
  async (productId, thunkAPI) => {
    try {
      const { data } = await axios.post(`/api/user/wishlist/add`, {
        productId,
      });
      return data.item;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeProductFromWishlist = createAsyncThunk(
  "wishlist/removeProduct",
  async (productId, thunkAPI) => {
    try {
      console.log("Sending DELETE request for productId:", productId); // Логування
      const response = await axios.delete(
        `/api/user/wishlist/remove/${productId}`
      ); // Використовуємо productId
      if (response.status !== 200) {
        throw new Error("Failed to delete product from wishlist");
      }
      return productId;
    } catch (error) {
      console.error("Error removing product:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const moveProductToShoppingCart = createAsyncThunk(
  "wishlist/moveToShoppingCart",
  async (id, thunkAPI) => {
    console.log("Moving product from wishlist to shopping cart with ID:", id); // Логування
    try {
      const { data } = await axios.post(
        `/api/user/wishlist/move-to-cart/${id}`
      );
      return data.item; // Повертаємо переміщений товар
    } catch (error) {
      console.error("Error moving product to shopping cart:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
