export const applyFilters = createAsyncThunk(
  "filters/applyFiltters",
  async (filters, thunkAPI) => {
    try {
      const response = await axios.get(`/api/products/filters`, {
        params: filters, // Передача фільтрів у запит
      });
      return response.data.filteredProducts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
