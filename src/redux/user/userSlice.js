import { createSlice } from "@reduxjs/toolkit";
import { getShoppingCart } from "../shopping/operationShopping";
import { getWishlist } from "../wishlist/operationWishlist";
import {
  deleteUserAccount,
  fetchRecentViews,
  fetchUserAddress,
  fetchUserInfo,
  fetchUserMain,
  fetchUserSettings,
  fetchWallet,
  getUserProducts,
  getUserProductsById,
  restoreSession,
  sendAdminMessage,
  updateUserAddress,
  updateUserInfo,
  updateUserSettings,
} from "./userOperations";
import {
  fetchPurchaseHistory,
  fetchUserOrders,
} from "./userOrders/operationsUserOrders";
const userReducer = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    recentViews: [],
    products: [],
    wishlist: [],
    shoppingCart: [],
    selectedProduct: null,
    orders: [],
    purchaseHistory: [],
    payments: [],
    wallet: 0,
    settings: {
      allowWalletUsage: true,
    },
  },
  reducers: {
    logoutUser(state) {
      console.log("🚪 Logging out user...");
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.orders = [];
      state.purchaseHistory = [];
      // ❌ Не видаляємо кошик і вішліст
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserMain.pending, (state) => {
        console.log("🔄 Fetching user main data...");
        state.loading = true;
      })
      .addCase(fetchUserMain.fulfilled, (state, action) => {
        console.log("✅ User main data loaded:", action.payload);
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserMain.rejected, (state, action) => {
        console.error("❌ Fetching user main failed:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(fetchUserAddress.fulfilled, (state, action) => {
        state.user.address = action.payload;
      })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        state.user.address = action.payload;
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        console.log("❌ User account deleted");
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
        state.wishlist = [];
        state.shoppingCart = [];
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      })

      .addCase(sendAdminMessage.fulfilled, (state, action) => {
        console.log("✅ Message sent to admin:", action.payload);
      })
      .addCase(fetchRecentViews.fulfilled, (state, action) => {
        state.recentViews = action.payload;
      })
      .addCase(getUserProductsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProductsById.fulfilled, (state, action) => {
        console.log("✅ Storing selected product in Redux:", action.payload);
        state.loading = false;
        state.selectedProduct = action.payload; // ✅ Записуємо отриманий товар
      })
      .addCase(getUserProductsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProducts.fulfilled, (state, action) => {
        console.log("🚀 Updating Redux state with products:", action.payload);
        state.loading = false;
        state.products = action.payload || [];
      })
      .addCase(getUserProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      })
      .addCase(restoreSession.fulfilled, (state, { payload }) => {
        console.log("✅ Restoring session:", payload);
        state.token = payload.token;
        state.user = payload.user;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(restoreSession.pending, (state) => {
        console.log("🔄 Restoring session...");
        state.loading = true;
      })
      .addCase(restoreSession.rejected, (state, action) => {
        console.error("❌ Session restore failed:", action.payload);
        state.loading = false;
        state.token = null;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(getShoppingCart.fulfilled, (state, action) => {
        state.shoppingCart = action.payload;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchPurchaseHistory.fulfilled, (state, action) => {
        state.purchaseHistory = action.payload;
      })
      .addCase(fetchWallet.fulfilled, (state, action) => {
        state.wallet = action.payload;
      })
      .addCase(fetchUserSettings.fulfilled, (state, action) => {
        state.settings = action.payload;
      })
      .addCase(updateUserSettings.fulfilled, (state, action) => {
        state.settings = action.payload;
      });
  },
});
export const { logoutUser } = userReducer.actions;
export default userReducer.reducer;
