import { createSlice } from "@reduxjs/toolkit";

const LOCAL_KEY = "guest_wishlist";
const loadFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
  } catch {
    return [];
  }
};
const saveToLocalStorage = (items) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
};

const guestWishlistSlice = createSlice({
  name: "guestWishlist",
  initialState: {
    items: loadFromLocalStorage(),
  },
  reducers: {
    toggleGuestWishlist(state, { payload: product }) {
      const exists = state.items.some((item) => item.id === product.id);
      if (exists) {
        state.items = state.items.filter((item) => item.id !== product.id);
      } else {
        state.items.unshift({
          id: product.id,
          name: product.name,
          price: product.price,
          photoUrl: product.photoUrl,
          addedAt: new Date().toISOString(),
        });
      }
      saveToLocalStorage(state.items);
    },
    clearGuestWishlist(state) {
      state.items = [];
      saveToLocalStorage([]);
    },
  },
});
export const { toggleGuestWishlist, clearGuestWishlist } =
  guestWishlistSlice.actions;
export default guestWishlistSlice.reducer;
