import items from '../data/items';
import { EquipmentSet } from '../models/equipments';
import { Item } from '../models/item';
import { reforge } from './forge';

function generateByBase(base: string): Item {
  console.log(`generate an item for base ${base}`);
  const item = items.find((i) => i.base === base);
  if (!item) {
    throw new Error(`item base '${base}' not found`);
  }
  item.level = 50;
  return reforge(item);
}

export function generateSet(): EquipmentSet {
  return {
    bodyArmour: generateByBase('Body Armour'),
    helmet: generateByBase('Helmet'),
    gloves: generateByBase('Gloves'),
    boots: generateByBase('Boots'),
    leftRing: generateByBase('Ring'),
    rightRing: generateByBase('Ring'),
    amulet: generateByBase('Amulet'),
    belt: generateByBase('Belt'),
    mainHand: generateByBase('Sword'),
    offHand: generateByBase('Shield'),
  };
}
