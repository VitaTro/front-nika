import { createSlice } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

const initialState = {
  isLoggedIn: !!localStorage.getItem("token"),
  user: null,
  token: localStorage.getItem("token") || null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      localStorage.removeItem("token");
    },
    checkAuth(state) {
      const token = localStorage.getItem("token");
      if (token) {
        state.isAuthenticated = true;
        state.token = token;
      } else {
        state.isAuthenticated = false;
        state.token = null;
      }
      state.loading = false;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    updateUser(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    clearUser(state) {
      state.user = null;
    },
  },
});

export const fetchUserData = () => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    if (!token) {
      state.error = error.message;
    }

    const response = await axios.get("/api/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setUser(response.data));
  } catch (error) {
    console.error("Failed to fetch user data", error);
    dispatch(logout());
  }
};
export const resetPassword = (email) => async () => {
  try {
    const response = await axios.post("/api/auth/reset-password", { email });
    console.log("Password reset link sent:", response.data);
  } catch (error) {
    console.error("Failed to reset password", error);
  }
};

export const updatePassword = (token, newPassword) => async () => {
  try {
    const response = await axios.post("/api/auth/update-password", {
      token,
      newPassword,
    });
    console.log("Password updated:", response.data);
  } catch (error) {
    console.error("Failed to update password", error);
  }
};

export const refreshToken = (refreshToken) => async (dispatch) => {
  try {
    const response = await axios.post("/api/auth/refresh-token", {
      refreshToken,
    });
    dispatch(setIsLoggedIn(true));
    dispatch(setUser(response.data));
  } catch (error) {
    console.error("Failed to refresh token", error);
    dispatch(logout());
  }
};
export const {
  login,
  logout,
  checkAuth,
  updateUser,
  setIsLoggedIn,
  setUser,
  clearUser,
} = authSlice.actions;
export default authSlice.reducer;
