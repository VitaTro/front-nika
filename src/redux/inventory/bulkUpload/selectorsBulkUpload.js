export const selectBulkUploadState = (state) => state.inventory.bulkUpload;

export const selectBulkUploadLoading = (state) =>
  state.inventory.bulkUpload.loading;
export const selectBulkUploadError = (state) =>
  state.inventory.bulkUpload.error;
export const selectBulkUploadSuccess = (state) =>
  state.inventory.bulkUpload.success;
