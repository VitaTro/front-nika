import { createSlice } from "@reduxjs/toolkit";
import {
  deleteUserAccount,
  fetchRecentViews,
  fetchUserAddress,
  fetchUserInfo,
  fetchUserMain,
  getUserProducts,
  getUserProductsById,
  sendAdminMessage,
  updateUserAddress,
  updateUserInfo,
} from "./userOperations";

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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserMain.fulfilled, (state, action) => {
        state.user = action.payload;
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
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
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
      });
    // .addCase(addProductToWishlist.fulfilled, (state, action) => {
    //   state.wishlist.push(action.payload); // ✅ Додаємо товар у wishlist
    // })
    // .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
    //   state.wishlist = state.wishlist.filter(
    //     (item) => item.productId !== action.payload.productId
    //   );
    // });
  },
});

export default userReducer.reducer;
