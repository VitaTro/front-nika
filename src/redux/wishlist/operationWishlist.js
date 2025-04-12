import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`api/user/wishlist`);
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
      const { data } = await axios.post(`/api/user/wishlist/add`, {
        productId,
      });
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
      const response = await axios.delete(`/api/user/wishlist/${productId}`);
      if (response.status !== 200) {
        throw new Error("Failed to delete product from wishlist");
      }
      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
