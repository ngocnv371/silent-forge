import { createSlice } from '@reduxjs/toolkit';
import { Item, ItemRarity } from '../../models/item';
import { reforge } from '../../services/forge';

const shortSword: Item = {
  id: 'Short Sword',
  name: 'Short Sword',
  base: 'Short Sword',
  level: 86,
  rarity: ItemRarity.Normal,
  modifiers: [],
};

interface State {
  item: Item;
}

const initialState = {
  item: shortSword,
} as State;

const slice = createSlice({
  name: 'forge',
  initialState,
  reducers: {
    reforgeItem(state) {
      const newItem = reforge(state.item);
      state.item = newItem;
    },
    scourgeItem(state) {
      const newItem = {
        id: state.item.id,
        name: state.item.base,
        base: state.item.base,
        rarity: ItemRarity.Normal,
        level: state.item.level,
        modifiers: [],
      };
      state.item = newItem;
    },
  },
});

export const { reforgeItem } = slice.actions;

export default slice.reducer;
