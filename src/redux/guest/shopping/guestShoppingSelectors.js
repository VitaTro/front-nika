export const selectGuestCart = (state) => state.guestCart.items;

export const selectGuestCartCount = (state) =>
  state.guestCart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectGuestCartTotal = (state) =>
  state.guestCart.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );
