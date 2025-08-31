import { configureStore } from '@reduxjs/toolkit';
import { cartReducer, videoReducer } from './slice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    video: videoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;