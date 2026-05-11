import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/store/counterSlice.js';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  devTools: import.meta.env.DEV,
});