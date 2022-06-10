import { configureStore } from '@reduxjs/toolkit';
import profile from './slices/profile';
import status from './slices/status';
import app from './slices/app';
import combat from './slices/combat';
import forge from './slices/forge';
import inventory from './slices/inventory';
import equipments from './slices/equipments';

const store = configureStore({
  reducer: {
    app,
    combat,
    profile,
    status,
    forge,
    inventory,
    equipments,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
