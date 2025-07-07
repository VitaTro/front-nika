import { createSlice } from "@reduxjs/toolkit";
import { uploadBulkMovements } from "./operationsBulkUpload";

const initialState = {
  success: null,
  loading: false,
  error: null,
};

const bulkUploadSlice = createSlice({
  name: "bulkUpload",
  initialState,
  reducers: {
    resetBulkStatus: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadBulkMovements.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(uploadBulkMovements.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.message || "Успішно імпортовано!";
      })
      .addCase(uploadBulkMovements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetBulkStatus } = bulkUploadSlice.actions;
export default bulkUploadSlice.reducer;
