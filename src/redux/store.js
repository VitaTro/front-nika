import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin/adminSlice";
import authReducer from "./auth/authSlice";
import filtersReducer from "./filters/filterSlice";
import offlineOrderReducer from "./finance/offlineOrder/offlineOrderSlice";
import offlineSalesReducer from "./finance/offlineSale/offlineSaleSlice";
import onlineOrdersReducer from "./finance/onlineOrder/onlineOrderSlice";
import onlineSalesReducer from "./finance/onlineSale/onlineSaleSlice";
import overviewReducer from "./finance/overview/overviewSlice";
import settingsReducer from "./finance/settings/settingsSlice";
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
    onlineOrders: onlineOrdersReducer,
    onlineSales: onlineSalesReducer,
    offlineOrder: offlineOrderReducer,
    offlineSale: offlineSalesReducer,
    overview: overviewReducer,
    settings: settingsReducer,
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
