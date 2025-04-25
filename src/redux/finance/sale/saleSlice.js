import { createSlice } from "@reduxjs/toolkit";
import { createSales, fetchSales, updateSalesStatus } from "./operationSale";

const salesSlice = createSlice({
  name: "sales",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createSales.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateSalesStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (sale) => sale._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});
export default salesSlice.reducer;
