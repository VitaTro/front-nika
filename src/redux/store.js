import { combineReducers, configureStore } from "@reduxjs/toolkit";

// 🌐 Основне ядро
import mainReducer from "./main/mainSlice";
import themeReducer from "./themeSlice";

// 👤 Аутентифікація
import adminAuthReducer from "./auth/adminAuth/adminAuthSlice";
import userAuthReducer from "./auth/userAuth/userAuthSlice";

// 👑 Адмін / Користувачі
import adminReducer from "./admin/adminSlice";
import userOrdersReducer from "./user/userOrders/userOrdersSlice";
import userReducer from "./user/userSlice";

// 🛒 Товари / Популярні / Пошук / Фільтри
import filtersReducer from "./filters/filterSlice";
import popularProductsReducer from "./popular/popularSlice";
import productsReducer from "./products/productsSlice";
import searchReducer from "./search/searchSlice";

// 💸 Покупки / Кошик / Платежі
import guestCartReducer from "./guest/shopping/guestShoppingSlice";
import guestWishlistReducer from "./guest/wishlist/guestWishlistSlice";
import paymentReducer from "./payment/paymentSlice";
import shoppingCartReducer from "./shopping/shoppingSlice";
import wishlistReducer from "./wishlist/wishlistSlice";
// 📊 Фінанси
import { expenseReducer } from "./finance/expense/expenseSlice";
import offlineOrdersReducer from "./finance/offlineOrder/offlineOrderSlice";
import offlineSalesReducer from "./finance/offlineSale/offlineSaleSlice";
import onlineOrdersReducer from "./finance/onlineOrder/onlineOrderSlice";
import onlineSalesReducer from "./finance/onlineSale/onlineSaleSlice";
import overviewReducer from "./finance/overview/overviewSlice";
import platformReducer from "./finance/platform/platformSlice";
import settingsReducer from "./finance/settings/settingsSlice";

// 🏭 Склад — ТИ самостійно імпортуєш 👇
import inventoryReducer from "./inventory/inventoryReducer";

const rootReducer = combineReducers({
  main: mainReducer,
  theme: themeReducer,

  // Auth
  adminAuth: adminAuthReducer,
  userAuth: userAuthReducer,

  // Адмін / Користувачі
  admin: adminReducer,
  user: userReducer,
  userOrders: userOrdersReducer,

  // Товари / Фільтри / Пошук
  products: productsReducer,
  popularProducts: popularProductsReducer,
  search: searchReducer,
  filters: filtersReducer,

  // Кошик / Платежі
  shoppingCart: shoppingCartReducer,
  payment: paymentReducer,
  wishlist: wishlistReducer,
  guestWishlist: guestWishlistReducer,
  guestCart: guestCartReducer,
  // Фінанси
  expenses: expenseReducer,
  offlineOrders: offlineOrdersReducer,
  offlineSales: offlineSalesReducer,
  onlineOrders: onlineOrdersReducer,
  onlineSales: onlineSalesReducer,
  overview: overviewReducer,
  settings: settingsReducer,
  platform: platformReducer,

  // Склад
  inventory: inventoryReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

window.store = store;

export default store;
