import { createSlice } from '@reduxjs/toolkit';
import modifiers from '../../data/mods';
import { Item, ItemRarity, ModifierInstance, ModifierTier, ModifierType, Weighted } from '../../models/item';

function getWeightedRandom<T extends Weighted>(items: T[], isEqual: (a: T, b: T) => boolean, quantity: number) {
  function calculateMap() {
    const map = [];
    for (let i = 0; i < items.length; i++) {
      let weight = items[i].weight;
      if (i === 0) {
        map[i] = weight;
        continue;
      }
      map[i] = map[i - 1] + weight;
    }
    return map;
  }
  function getItem(seed: number) {
    for (let i = 0; i < map.length; i++) {
      if (map[i] > seed) {
        return items[i];
      }
    }
    throw new Error(`Seed ${seed} out of range`);
  }
  function calculateTotalWeight() {
    return items.reduce((prev, curr) => {
      return prev + curr.weight;
    }, 0);
  }
  const map = calculateMap();
  const totalWeight = calculateTotalWeight();
  const bag: T[] = [];
  while (bag.length < quantity) {
    const candidateSeed = Math.floor(Math.random() * totalWeight);
    const candidate = getItem(candidateSeed);
    if (bag.some((i) => isEqual(i, candidate))) {
      continue;
    }
    bag.push(candidate);
  }
  return bag;
}

function rollMagnitudes(tier: ModifierTier) {
  const m = tier.magnitudes.map((mag) => {
    if (mag.length === 1) {
      return mag[0];
    }
    if (mag.some((m) => m.toString().includes('.'))) {
      // if this mag contains decimal: [1, 1.2] we need to multiply it to round number [100, 120]
      // scale up
      const x100 = mag.map((m) => m * 100);
      const [min, max] = x100;
      const ret = min + Math.floor(Math.random() * (max - min));
      // scale down
      // keep only 2 decimals
      return Math.round(ret * 100) / 10000;
    }
    if (mag.length > 1) {
      const [min, max] = mag;
      return min + Math.floor(Math.random() * (max - min));
    }
    return mag[0];
  });
  return m;
}

function createItemName(item: Item) {
  const bestPrefix = item.modifiers.filter((m) => m.type === ModifierType.Prefix).sort((a, b) => a.level - b.level);
  const bestSuffix = item.modifiers.filter((m) => m.type === ModifierType.Suffix).sort((a, b) => a.level - b.level);
  let name = item.base;
  if (bestPrefix.length) {
    name = `${bestPrefix[0].name} ${name}`;
  }
  if (bestSuffix.length) {
    name = `${name} ${bestSuffix[0].name}`;
  }
  return name;
}

const isNameEqual = (a: { name: string }, b: { name: string }) => a.name === b.name;

function getMaxNumberOfAffixes(rarity: ItemRarity) {
  switch (rarity) {
    case ItemRarity.Normal:
      return 0;
    case ItemRarity.Magic:
      return 2;
    case ItemRarity.Rare:
      return 3;
  }
  return 3;
}

// create a number greater than or equal to zero and lesser than 4
function getRandomNumberOfAffixes(rarity: ItemRarity) {
  const max = getMaxNumberOfAffixes(rarity);
  const num = Math.floor(Math.random() * 4);
  if (num > max) {
    return max;
  }
  return num;
}

function rollRarity(): ItemRarity {
  const num = Math.random() * 5;
  if (num <= 2) {
    return ItemRarity.Magic;
  }
  return ItemRarity.Rare;
}

export function reforge(item: Item): Item {
  console.groupCollapsed('reforge');
  const rarity = rollRarity();
  console.log(`rarity: ${rarity}`);

  console.group('prefix');
  const availablePrefixes = modifiers.filter((m) => m.tiers[0].level <= item.level && m.type === ModifierType.Prefix);
  console.log(`available prefixes: ${availablePrefixes.length}`);
  const maxPrefixes = getRandomNumberOfAffixes(rarity);
  console.log(`max prefixes: ${maxPrefixes}`);
  const prefixes = getWeightedRandom(availablePrefixes, isNameEqual, maxPrefixes);
  console.log(`generated prefixes`, prefixes);
  console.groupEnd();

  console.group('suffix');
  const availableSuffixes = modifiers.filter((m) => m.tiers[0].level <= item.level && m.type === ModifierType.Suffix);
  console.log(`available suffixes: ${availableSuffixes.length}`);
  const maxSuffixes = getRandomNumberOfAffixes(rarity);
  console.log(`max suffixes: ${maxSuffixes}`);
  const suffixes = getWeightedRandom(availableSuffixes, isNameEqual, maxSuffixes);
  console.log(`generated suffixes`, suffixes);
  console.groupEnd();

  const mods = [...prefixes, ...suffixes];
  const inializedMods: ModifierInstance[] = mods.map((m) => {
    const tiers = getWeightedRandom<ModifierTier>(m.tiers, isNameEqual, 1);
    const tier = tiers[0];
    const magnitudes = rollMagnitudes(tier);
    return {
      type: m.type,
      level: tier.level,
      name: tier.name,
      description: m.description,
      magnitudes,
    };
  });

  console.group('initialized mods');
  console.table(inializedMods);
  console.groupEnd();

  const newItem = {
    ...item,
    modifiers: inializedMods,
  };
  newItem.name = createItemName(newItem);
  console.log(`generated name: ${newItem.name}`);
  console.log(`new item`, newItem);
  console.groupEnd();

  return newItem;
}

export const shortSword: Item = {
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
