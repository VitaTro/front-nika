import { createSlice } from "@reduxjs/toolkit";
import {
  createPlatformOrder,
  createPlatformSale,
  fetchPlatformOrderById,
  fetchPlatformOrders,
  fetchPlatformSaleById,
  fetchPlatformSales,
} from "./operationPlatform";
const platformSlice = createSlice({
  name: "platform",
  initialState: {
    orders: [],
    sales: [],
    loadingOrders: false,
    loadingSales: false,
    errorOrders: null,
    errorSales: null,
    selectedOrder: null,
    selectedSale: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createPlatformOrder.pending, (state) => {
        state.loadingOrders = true;
        state.errorOrders = null;
      })
      .addCase(createPlatformOrder.fulfilled, (state, action) => {
        state.loadingOrders = false;
        state.orders.push(action.payload.order); // або просто action.payload, залежно від беку
      })
      .addCase(createPlatformOrder.rejected, (state, action) => {
        state.loadingOrders = false;
        state.errorOrders = action.payload;
      })
      .addCase(fetchPlatformOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders; // залежить від відповіді бекенду
      })
      .addCase(fetchPlatformOrderById.fulfilled, (state, action) => {
        state.selectedOrder = action.payload.order;
      })
      // Create Sale
      .addCase(createPlatformSale.pending, (state) => {
        state.loadingSales = true;
        state.errorSales = null;
      })
      .addCase(createPlatformSale.fulfilled, (state, action) => {
        state.loadingSales = false;
        state.sales.push(action.payload.sale);
      })
      .addCase(createPlatformSale.rejected, (state, action) => {
        state.loadingSales = false;
        state.errorSales = action.payload;
      })
      .addCase(fetchPlatformSales.fulfilled, (state, action) => {
        state.sales = action.payload.sales;
      })
      .addCase(fetchPlatformSaleById.fulfilled, (state, action) => {
        state.selectedSale = action.payload.sale;
      });
  },
});

export default platformSlice.reducer;
