import { createSlice } from "@reduxjs/toolkit";
import {
  addAdminProduct,
  deleteAdminProduct,
  deleteAdminUser,
  fetchAdminDashboard,
  fetchAdminUsers,
} from "./operationsAdmin";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    products: [],
    dashboard: {},
    loading: false,
    error: null,
  },
  reducers: {}, // Основні редюсери, якщо потрібно
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
      .addCase(addAdminProduct.fulfilled, (state, { payload }) => {
        state.products.push(payload);
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
