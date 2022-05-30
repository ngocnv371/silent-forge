import { configureStore } from '@reduxjs/toolkit';
import profile from './slices/profile';
import status from './slices/status';
import app from './slices/app';
import tap from './slices/tap';
import forge from './slices/forge';
import inventory from './slices/inventory';

const store = configureStore({
  reducer: {
    app,
    tap,
    profile,
    status,
    forge,
    inventory,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
