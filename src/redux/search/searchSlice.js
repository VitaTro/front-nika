import { createSlice } from "@reduxjs/toolkit";
import { searchProducts } from "./operationSearch";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [], // Правильно визначено стан для результатів
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true; // Встановлюємо стан завантаження
        state.error = null; // Очищуємо попередні помилки
        state.results = [];
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        console.log("Payload from backend:", action.payload);
        state.loading = false; // Завантаження завершено
        state.results = action.payload; // Зберігаємо результати у state.results
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false; // Помилка завершення запиту
        state.error = action.payload; // Зберігаємо помилку
        state.results = [];
      });
  },
});

export default searchSlice.reducer;
