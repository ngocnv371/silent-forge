import { Item, ItemRarity, Modifier, ModifierInstance, ModifierTier, ModifierType, Weighted } from '../../models/item';

const modifiers: Modifier[] = require('../../../public/assets/mods.json');

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

export function reforge(item: Item): Item {
  const availablePrefixes = modifiers.filter((m) => m.tiers[0].level <= item.level && m.type === ModifierType.Prefix);
  console.log(`available prefixes: ${availablePrefixes.length}`);
  const availableSuffixes = modifiers.filter((m) => m.tiers[0].level <= item.level && m.type === ModifierType.Suffix);
  console.log(`available suffixes: ${availableSuffixes.length}`);
  const prefixes = getWeightedRandom(availablePrefixes, isNameEqual, 3);
  console.log(`generated prefixes`, prefixes);
  const suffixes = getWeightedRandom(availableSuffixes, isNameEqual, 3);
  console.log(`generated suffixes`, suffixes);
  const mods = [...prefixes, ...suffixes];
  const inializedMods: ModifierInstance[] = mods.map((m) => {
    const tiers = getWeightedRandom<ModifierTier>(m.tiers, isNameEqual, 1);
    const tier = tiers[0];
    const magnitudes = rollMagnitudes(tier);
    return {
      ...m,
      level: tier.level,
      name: tier.name,
      magnitudes,
    };
  });
  console.log(`initialized mods`, inializedMods);
  const newItem = {
    ...item,
    modifiers: inializedMods,
  };
  newItem.name = createItemName(newItem);
  console.log(`generated name: ${newItem.name}`);
  console.log(`new item`, newItem);
  return item;
}

export const shortSword: Item = {
  id: 'Short Sword',
  name: 'Short Sword',
  base: 'Short Sword',
  level: 86,
  rarity: ItemRarity.Normal,
  modifiers: [],
};
