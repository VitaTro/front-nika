import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin/adminSlice";
import authReducer from "./auth/authSlice";
import filtersReducer from "./filters/filterSlice";
import popularProductsReducer from "./popular/popularSlice";
import productsReducer from "./products/productsSlice";
import searchReducer from "./search/searchSlice";
import shoppingCartReducer from "./shopping/shoppingSlice";
import themeReducer from "./themeSlice";
import userReducer from "./user/userSlice";
import wishlistReducer from "./wishlist/wishlistSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    admin: adminReducer,
    products: productsReducer,
    popularProducts: popularProductsReducer,
    search: searchReducer,
    cart: shoppingCartReducer,
    wishlist: wishlistReducer,
    filters: filtersReducer,
    theme: themeReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
export default store;
