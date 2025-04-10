import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://nika-gold-back-fe0ff35469d7.herokuapp.com/";

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`api/wishlist`);
      return data.products || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addProductToWishlist = createAsyncThunk(
  "wishlist/addProduct",
  async (productId, thunkAPI) => {
    try {
      const { data } = await axios.post(`/api/wishlist`, { productId });
      return data.product;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const removeProductFromWishlist = createAsyncThunk(
  "wishlist/removeProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/wishlist/${productId}`);
      if (response.status !== 200) {
        throw new Error("Failed to delete product from wishlist");
      }
      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
