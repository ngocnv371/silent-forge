import { configureStore } from '@reduxjs/toolkit';
import profile from './slices/profile';
import status from './slices/status';
import tap from './slices/tap';

const store = configureStore({
  reducer: {
    tap,
    profile,
    status,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
