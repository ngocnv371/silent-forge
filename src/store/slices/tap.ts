import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'Big bad monster',
  life: 100,
  maxLife: 100,
};
const slice = createSlice({
  name: 'tap',
  initialState,
  reducers: {
    tap(state) {
      state.life -= 10;
      if (state.life < 1) {
        state.life = 0;
        console.log('dead');
      }
    },
    reset(state) {
      state.name = initialState.name;
      state.life = initialState.life;
      state.maxLife = initialState.maxLife;
    },
  },
});

export const { tap, reset } = slice.actions;

export default slice.reducer;
