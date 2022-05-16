import { Item, ItemRarity } from '../models/item';

interface RawItem {
  name: string;
  tags: string[];
}

const rawItems = require('./raw/items.json') as RawItem[];
const items = rawItems.map((i) => {
  const x: Item = {
    name: i.name,
    rarity: ItemRarity.Normal,
    modifiers: [],
    base: '',
    id: i.name,
    level: 0,
    tags: i.tags,
  };
  return x;
});

export default items;
