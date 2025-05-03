import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin/adminSlice";
import authReducer from "./auth/authSlice";
import filtersReducer from "./filters/filterSlice";
import offlineOrderReducer from "./finance/offlineOrder/offlineOrderSlice";
import offlineSaleReducer from "./finance/offlineSale/offlineSaleSlice";
import onlineOrderReducer from "./finance/onlineOrder/onlineOrderSlice";
import onlineSaleReducer from "./finance/onlineSale/onlineSaleSlice";
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
    onlineOrder: onlineOrderReducer,
    onlineSale: onlineSaleReducer,
    offlineOrder: offlineOrderReducer,
    offlineSale: offlineSaleReducer,
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
