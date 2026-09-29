import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "shopshield_wishlist";

const loadInitial = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const persist = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage unavailable — fail silently, wishlist just won't persist
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    // Each item: { id, name, price, image, href, source: 'catalog' | 'api' }
    items: loadInitial(),
  },
  reducers: {
    toggleWishlistItem: (state, action) => {
      const item = action.payload;
      const exists = state.items.some((i) => i.id === item.id);
      state.items = exists
        ? state.items.filter((i) => i.id !== item.id)
        : [...state.items, item];
      persist(state.items);
    },
    removeWishlistItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      persist(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      persist(state.items);
    },
  },
});

export const { toggleWishlistItem, removeWishlistItem, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
