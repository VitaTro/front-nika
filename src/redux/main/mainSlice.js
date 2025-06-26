import { createSlice } from "@reduxjs/toolkit";
import { fetchPublicMain } from "./mainOperations";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicMain.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicMain.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(fetchPublicMain.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default mainSlice.reducer;
