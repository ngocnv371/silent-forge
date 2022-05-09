export enum ModifierType {
  Prefix = 'Prefix',
  Suffix = 'Suffix',
}

export interface Weighted {
  weight: number;
}

export interface Leveled {
  level: number;
}

export interface ModifierTier extends Weighted, Leveled {
  name: string;
  magnitudes: number[][];
}

export interface Modifier extends Weighted {
  name: string;
  type: ModifierType;
  description: string;
  tags: string[];
  tiers: ModifierTier[];
}

/**
   * one instance of a modidifer
  
   * {
  
   *      name: "of Champion",
   *      description: "Adds # to # physical damage. Adds # to # accuracy."
   *      magnitudes: [1, 100, 3, 43]
   * }
   */
export interface ModifierInstance {
  name: string;
  type: ModifierType;
  description: string;
  level: number;
  magnitudes: number[];
}

export enum ItemRarity {
  Normal,
  Magic,
  Rare,
  Unique,
}

export interface Item extends Leveled {
  id: string;
  name: string;
  base: string;
  rarity: ItemRarity;
  modifiers: ModifierInstance[];
}
