export interface Character {
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  level: number;

  strength: number;
  dexterity: number;
  intelligence: number;

  life: number;
  maxLife: number;
  mana: number;
  maxMana: number;
}
