import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin/adminSlice";
import adminAuthReducer from "./auth/adminAuth/adminAuthSlice";
import userAuthReducer from "./auth/userAuth/userAuthSlice";
import filtersReducer from "./filters/filterSlice";
import offlineOrdersReducer from "./finance/offlineOrder/offlineOrderSlice";
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
    user: userReducer,
    userOrders: userOrdersReducer,
    adminAuth: adminAuthReducer,
    userAuth: userAuthReducer,
    admin: adminReducer,
    onlineOrders: onlineOrdersReducer,
    onlineSales: onlineSalesReducer,
    offlineOrders: offlineOrdersReducer,
    offlineSales: offlineSalesReducer,
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
