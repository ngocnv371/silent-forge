import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ItemStack } from '../../models/item';

type State = ItemStack[];

const initialState: State = [];

const slice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addStack(state, payload: PayloadAction<ItemStack>) {
      const index = state.findIndex((s) => s.item.id === payload.payload.item.id);
      if (index >= 0) {
        const newItem = { ...state[index], quantity: state[index].quantity + payload.payload.quantity };
        state.splice(index, 1, newItem);
      } else {
        state.push({ ...payload.payload });
      }
    },
    removeStack(state, payload: PayloadAction<ItemStack>) {
      const index = state.findIndex((s) => s.item.id === payload.payload.item.id);
      if (index >= 0) {
        const newItem = { ...state[index] };
        newItem.quantity -= payload.payload.quantity;
        if (newItem.quantity <= 0) {
          state.splice(index, 1);
        } else {
          state.splice(index, 1, newItem);
        }
      }
    },
  },
});

export const { addStack, removeStack } = slice.actions;
export default slice.reducer;
