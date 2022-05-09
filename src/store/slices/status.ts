import { createSlice } from '@reduxjs/toolkit';

interface State {
  strength: number;
  dexterity: number;
  intelligence: number;
  life: number;
  maxLife: number;
  mana: number;
  maxMana: number;
}

const initialState = {
  strength: 10,
  dexterity: 10,
  intelligence: 10,
  life: 100,
  maxLife: 100,
  mana: 50,
  maxMana: 50,
} as State;

const slice = createSlice({
  name: 'status',
  initialState,
  reducers: {},
});

export const {} = slice.actions;
export default slice.reducer;
