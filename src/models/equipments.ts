import { Item } from "./item";

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
