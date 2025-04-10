import { createSlice } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

const adminSlice = createSlice({
  name: "admin",
  initialState: { users: [], products: [], dashboard: {} },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setProducts(state, action) {
      state.products = action.payload;
    },
    setDashboard(state, action) {
      state.dashboard = action.payload;
    },
  },
});

export const fetchAdminDashboard = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/admin/dashboard");
    dispatch(setDashboard(response.data));
  } catch (error) {
    console.error("Failed to fetch admin dashboard", error);
  }
};

export const { setUsers, setProducts, setDashboard } = adminSlice.actions;
export default adminSlice.reducer;
