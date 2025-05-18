import { createSlice } from "@reduxjs/toolkit";
import {
  addAdminProduct,
  deleteAdminProduct,
  deleteAdminUser,
  fetchAdminDashboard,
  fetchAdminProducts,
  fetchAdminUsers,
  updateAdminProduct,
} from "./operationsAdmin";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    products: [],
    dashboard: {},
    finance: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload;
      })
      .addCase(fetchAdminUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteAdminUser.fulfilled, (state, { payload }) => {
        state.users = state.users.filter((user) => user.id !== payload);
      })
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(addAdminProduct.fulfilled, (state, { payload }) => {
        state.products.push(payload);
      })
      .addCase(updateAdminProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdminProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product.id === payload.updatedProduct.id
        );
        if (index !== -1) {
          state.products[index] = payload.updatedProduct; // Оновлення продукту в списку
        }
      })
      .addCase(updateAdminProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteAdminProduct.fulfilled, (state, { payload }) => {
        state.products = state.products.filter(
          (product) => product.id !== payload
        );
      })
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, { payload }) => {
        console.log("🛠️ Dashboard Data in Redux:", payload);
        state.loading = false;
        state.dashboard = payload;
      })
      .addCase(fetchAdminDashboard.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default adminSlice.reducer;
