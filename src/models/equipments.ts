import { Item } from './item';

export type EquipmentSet = {
  bodyArmour?: Item;
  helmet?: Item;
  gloves?: Item;
  boots?: Item;
  leftRing?: Item;
  rightRing?: Item;
  amulet?: Item;
  belt?: Item;
  mainHand?: Item;
  offHand?: Item;
};

export type EquipmentSlot = keyof EquipmentSet;

export function toItemArray(set: EquipmentSet): Item[] {
  const items = [
    set.amulet,
    set.belt,
    set.bodyArmour,
    set.boots,
    set.gloves,
    set.helmet,
    set.leftRing,
    set.rightRing,
    set.mainHand,
    set.offHand,
  ];
  return items.filter(Boolean) as Item[];
}
