import { createSlice } from "@reduxjs/toolkit";
import {
  addAdminMaterial,
  addAdminProduct,
  deleteAdminMaterial,
  deleteAdminProduct,
  deleteAdminUser,
  fetchAdminDashboard,
  fetchAdminMaterials,
  fetchAdminProducts,
  fetchAdminUsers,
  updateAdminMaterial,
  updateAdminProduct,
} from "./operationsAdmin";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    products: [],
    materials: [],
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
        console.log("🚀 Отриманий payload після PATCH:", payload);
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product.id === payload.updatedProduct.id,
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
          (product) => product.id !== payload,
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
      })
      .addCase(fetchAdminMaterials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminMaterials.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.materials = payload;
      })
      .addCase(fetchAdminMaterials.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(addAdminMaterial.fulfilled, (state, { payload }) => {
        state.materials.push(payload);
      })
      .addCase(updateAdminMaterial.fulfilled, (state, { payload }) => {
        const index = state.materials.findIndex(
          (material) => material.id === payload.updatedMaterial.id,
        );
        if (index !== -1) {
          state.materials[index] = payload.updatedMaterial;
        }
      })
      .addCase(deleteAdminMaterial.fulfilled, (state, { payload }) => {
        state.materials = state.materials.filter(
          (material) => material.id !== payload,
        );
      });
  },
});

export default adminSlice.reducer;
