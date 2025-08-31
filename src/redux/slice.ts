import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartState, VideoState } from "../types/TypesProps";

const initialCartState: CartState = {
  items: []
};

const initialState: VideoState = {};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem(state, action: PayloadAction<number | undefined>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    }
  }
});

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setPlayState: (
      state,
      action: PayloadAction<{ id: number | undefined; isPlaying: boolean }>
    ) => {
      const { id, isPlaying } = action.payload;
      if(!id) return
      if (!state[id]) {
        state[id] = { isPlaying, currentTime: 0 };
      } else {
        state[id].isPlaying = isPlaying;
      }
    },
    setCurrentTime: (
      state,
      action: PayloadAction<{ id: number | undefined; currentTime: number }>
    ) => {
      const { id, currentTime } = action.payload;
      if(!id) return
      if (!state[id]) {
        state[id] = { isPlaying: false, currentTime };
      } else {
        state[id].currentTime = currentTime;
      }
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export const { setPlayState, setCurrentTime } = videoSlice.actions;
export const cartReducer = cartSlice.reducer;
export const videoReducer = videoSlice.reducer;