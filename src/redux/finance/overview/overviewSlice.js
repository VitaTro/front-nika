import { createSlice } from "@reduxjs/toolkit";
import { fetchFinanceOverview } from "./operationOverview";
const financeSlice = createSlice({
  name: "finance",
  initialState: {
    overview: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFinanceOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFinanceOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.overview = action.payload;
      })
      .addCase(fetchFinanceOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default financeSlice.reducer;
