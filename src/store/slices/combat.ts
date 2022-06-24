import { createSlice } from '@reduxjs/toolkit';
import { ModifiersMap } from '../../models/character';

const initialState: ModifiersMap = {
};

const slice = createSlice({
  name: 'combat',
  initialState,
  reducers: {
    tap(state) {
    },
    reset(state) {
    },
  },
});

export const { tap, reset } = slice.actions;

export default slice.reducer;
