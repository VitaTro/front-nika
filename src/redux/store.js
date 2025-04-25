import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin/adminSlice";
import authReducer from "./auth/authSlice";
import filtersReducer from "./filters/filterSlice";
import ordersReducer from "./finance/order/orderSlice";
import overviewReducer from "./finance/overview/overviewSlice";
import salesReducer from "./finance/sale/saleSlice";
import popularProductsReducer from "./popular/popularSlice";
import productsReducer from "./products/productsSlice";
import searchReducer from "./search/searchSlice";
import shoppingCartReducer from "./shopping/shoppingSlice";
import themeReducer from "./themeSlice";
import userOrdersReducer from "./user/userOrders/userOrdersSlice";
import userReducer from "./user/userSlice";
import wishlistReducer from "./wishlist/wishlistSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    userOrders: userOrdersReducer,
    admin: adminReducer,
    orders: ordersReducer,
    sales: salesReducer,
    overview: overviewReducer,
    products: productsReducer,
    popularProducts: popularProductsReducer,
    search: searchReducer,
    shoppingCart: shoppingCartReducer,
    wishlist: wishlistReducer,
    filters: filtersReducer,
    theme: themeReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
export default store;
