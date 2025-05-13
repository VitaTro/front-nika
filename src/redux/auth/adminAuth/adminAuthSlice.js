import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAdminLogin,
  fetchAdminRegister,
  logoutAdmin,
  sendAdminEmail,
} from "./operationsAdminAuth";

const initialState = {
  admin: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const adminAuthReducer = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(fetchAdminRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.admin = action.payload.user;
      })
      .addCase(fetchAdminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendAdminEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendAdminEmail.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendAdminEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.admin = null;
        state.token = null;
        state.loading = false;
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default adminAuthReducer.reducer;
