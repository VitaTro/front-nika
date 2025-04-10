import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import themeReducer from "./themeSlice";
export default configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
