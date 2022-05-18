import { Character } from '../models';
import { applyCurve, Curve } from '../models/curve';

export interface BeastiaryEntry {
  name: string;
  level: Curve;
  description: string;
  strength: Curve;
  dexterity: Curve;
  intelligence: Curve;
  maxLife: Curve;
  maxMana: Curve;
  tags: string[];
}

console.time('import monsters.json');
export const entries: BeastiaryEntry[] = require('./raw/monsters.json');
console.timeEnd('import monsters.json');

let lastId = 0;
function getNexId() {
  return ++lastId;
}

export function createMonster(name: string, level: number): Character {
  console.groupCollapsed(`generate level ${level} '${name}'`);
  const def = entries.find((d) => d.name === name);
  if (!def) {
    throw new Error(`monster name '${name}' not found`);
  }
  if (level < 1 || level > 100) {
    throw new Error(`level invalid: ${level}`);
  }
  const seed = level / 100;
  const char: Character = {
    id: getNexId() + '',
    name,
    description: def.description,
    tags: def.tags,
    level,
    strength: applyCurve(def.maxLife, seed),
    dexterity: applyCurve(def.maxLife, seed),
    intelligence: applyCurve(def.maxLife, seed),
    maxLife: applyCurve(def.maxLife, seed),
    maxMana: applyCurve(def.maxLife, seed),
    life: 0,
    mana: 0,
  };
  char.life = char.maxLife;
  char.mana = char.maxMana;
  console.groupEnd();
  return char;
}

// all tags available
export const tags = entries.reduce((p, c) => {
  return [...p, ...c.tags.filter((i) => !p.includes(i))];
}, [] as string[]);
