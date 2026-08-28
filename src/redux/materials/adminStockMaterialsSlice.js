import { createSlice } from "@reduxjs/toolkit";
import {
  addAdminStockMaterials,
  deleteAdminStockMovement,
  fetchAdminStockMaterials,
} from "./operationsAdminStockMaterials";

const initialState = {
  stock: [],
  loading: false,
  error: null,
};

const adminStockMaterialsReducer = createSlice({
  name: "adminStockMaterials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStockMaterials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminStockMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.stock = action.payload;
      })
      .addCase(fetchAdminStockMaterials.rejected, (state, action) => {})
      .addCase(addAdminStockMaterials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAdminStockMaterials.fulfilled, (state) => {
        state.loading = false;
        state.stock.push(action.payload);
      })
      .addCase(addAdminStockMaterials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAdminStockMovement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdminStockMovement.fulfilled, (state, action) => {
        state.loading = false;
        state.stock = state.stock.filter(
          (movement) => movement._id !== action.payload,
        );
      })
      .addCase(deleteAdminStockMovement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default adminStockMaterialsReducer.reducer;
