import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://nika-gold-back-fe0ff35469d7.herokuapp.com/";

export const getShoppingCart = createAsyncThunk(
  "shoppingCart/getAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`api/shopping-cart`);
      return data?.products || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProductFromCart = createAsyncThunk(
  "shoppingCart/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.delete(`api/shopping-cart/${productId}`);

      if (response.status !== 200) {
        throw new Error(`Failed to delete product: ${response.statusText}`);
      }

      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "shoppingCart/addProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.post(`/api/shopping-cart`, { productId });
      return response.data.product;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
