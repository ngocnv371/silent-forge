import { createSlice } from '@reduxjs/toolkit';
import { generateSet } from '../../services/equipments';

const initialState = generateSet();

const slice = createSlice({
  name: 'equipments',
  initialState,
  reducers: {},
});

export const {} = slice.actions;

export default slice.reducer;
