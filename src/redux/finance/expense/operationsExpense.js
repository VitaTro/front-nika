import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/admin/finance/expense");
      return response.data.expenses;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const createExpense = createAsyncThunk(
  "expenses/create",
  async (newExpense, thunkAPI) => {
    try {
      const response = await axios.post(
        "/api/admin/finance/expense",
        newExpense
      );
      return response.data.expense;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);
