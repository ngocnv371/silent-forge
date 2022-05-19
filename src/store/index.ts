import { configureStore } from '@reduxjs/toolkit';
import profile from './slices/profile';
import status from './slices/status';
import app from './slices/app';
import tap from './slices/tap';
import forge from './slices/forge';

const store = configureStore({
  reducer: {
    app,
    tap,
    profile,
    status,
    forge,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
