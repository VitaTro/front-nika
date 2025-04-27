export const selectOfflineSales = (state) => state.offlineSales.sales;
export const selectOfflineSalesLoading = (state) =>
  state.offlineSales.isLoading;
export const selectOfflineSalesError = (state) => state.offlineSales.error;
