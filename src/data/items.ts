import { Item, ItemRarity } from '../models/item';

interface RawItem {
  name: string;
  base?: string;
  tags: string[];
}

const rawItems = require('./raw/items.json') as RawItem[];
const items = rawItems.map((i) => {
  const x: Item = {
    name: i.name,
    rarity: ItemRarity.Normal,
    modifiers: [],
    base: i.base || '',
    id: i.name,
    level: 0,
    tags: i.tags,
  };
  return x;
});

// all tags available
export const tags = items.reduce((p, c) => {
  return [...p, ...(c.tags || []).filter((i) => !p.includes(i))];
}, [] as string[]);

export default items;
