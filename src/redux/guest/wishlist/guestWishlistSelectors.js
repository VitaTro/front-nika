export const selectGuestWishlist = (state) => state.guestWishlist.items;

export const isInGuestWishlist = (productId) => (state) =>
  state.guestWishlist.items.some((item) => item.id === productId);
