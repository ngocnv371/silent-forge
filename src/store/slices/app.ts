import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  dark: false,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.dark = !state.dark;
      console.log(`dark mode set to ${state.dark}`);
    },
    setDarkMode(state, payload: PayloadAction<boolean>) {
      state.dark = payload.payload;
      console.log(`dark mode set to ${state.dark}`);
    },
  },
});

export const { setDarkMode, toggleDarkMode } = slice.actions;

export default slice.reducer;
