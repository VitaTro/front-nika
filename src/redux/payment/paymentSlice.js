import { createSlice } from "@reduxjs/toolkit";
import {
  checkPaymentStatus,
  confirmPayment,
  initiatePayment,
} from "./operationPayment";
const paymentReducer = createSlice({
  name: "payment",
  initialState: { payment: null, status: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.payment = action.payload;
      })
      .addCase(checkPaymentStatus.fulfilled, (state, action) => {
        state.status = action.payload;
      })
      .addCase(confirmPayment.fulfilled, (state, action) => {
        state.payment = action.payload;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(checkPaymentStatus.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(confirmPayment.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default paymentReducer.reducer;
