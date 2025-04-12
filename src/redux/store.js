import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./combineReducers";
import themeReducer from "./themeSlice";
const store = configureStore({
  reducer: {
    reducer: rootReducer,
    theme: themeReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
export default store;
