import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const LOCAL_KEY = "guest_cart";

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

const guestCartSlice = createSlice({
  name: "guestCart",
  initialState: {
    items: loadFromLocalStorage(), // [{id, name, price, quantity, photoUrl}]
  },
  reducers: {
    addGuestCartItem(state, { payload }) {
      const existing = state.items.find((i) => i.id === payload.id);

      if (existing) {
        existing.quantity += payload.quantity ?? 1;
      } else {
        state.items.push({
          ...payload,
          quantity: payload.quantity ?? 1,
        });
      }

      saveToLocalStorage(state.items);
    },

    removeGuestCartItem(state, { payload: id }) {
      state.items = state.items.filter((item) => item.id !== id);
      saveToLocalStorage(state.items);
    },

    updateGuestCartQuantity(state, { payload }) {
      const { id, quantity } = payload;
      const item = state.items.find((i) => i.id === id);

      if (item) {
        item.quantity = Math.max(1, quantity);
        saveToLocalStorage(state.items);
      }
    },

    clearGuestCart(state) {
      state.items = [];
      saveToLocalStorage([]);
    },
  },
});

export const {
  addGuestCartItem,
  removeGuestCartItem,
  updateGuestCartQuantity,
  clearGuestCart,
} = guestCartSlice.actions;

export default guestCartSlice.reducer;
export const mergeGuestCart = createAsyncThunk(
  "shoppingCart/mergeGuestCart",
  async (localCart, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/shopping-cart/merge", {
        localCart,
      });

      return data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
