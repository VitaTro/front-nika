import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`api/wishlist`);

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
      const { data } = await axios.post(`/api/wishlist/add`, {
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
      const response = await axios.delete(`/api/wishlist/remove/${productId}`); // Використовуємо productId
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
