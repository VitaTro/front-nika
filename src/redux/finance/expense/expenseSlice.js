import { createSlice } from "@reduxjs/toolkit";
import { createExpense, fetchExpenses } from "./operationsExpense";

const initialState = {
  expenses: [],
  isLoading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.expenses.unshift(action.payload); // додаємо нову витрату зверху
      }),
});

export const expenseReducer = expenseSlice.reducer;
