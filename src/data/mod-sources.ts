import { applyCurve, Curve } from '../models/curve';

const NUM_TIERS = 9;
const sources = require('./raw/mod-sources.json') as Mod[];

interface Mod {
  name: string;
  type: 'Prefix' | 'Suffix';
  weight: number;
  description: string;
  tags: string[];
  tier: {
    level: Curve;
    weight: Curve;
    magnitudes: [Curve, Curve];
  };
}

function generate(mod: Mod) {
  console.groupCollapsed(`generate mod ${mod.name}`);
  const tiers = Array.from(Array(NUM_TIERS).keys()).map((idx) => {
    console.log(`generate tier ${idx}`);
    const curveIndex = 1 - idx / 10;
    const t = {
      level: applyCurve(mod.tier.level, curveIndex),
      magnitudes: mod.tier.magnitudes.map((m) => applyCurve(m, curveIndex)),
      weight: mod.tier.weight.max - applyCurve(mod.tier.weight, curveIndex) + mod.tier.weight.min,
    };
    console.log(`generated tier`, t);
    return t;
  });
  const ret = {
    name: mod.name,
    type: mod.type,
    weight: mod.weight,
    description: mod.description,
    tags: mod.tags,
    tiers,
  };
  console.log(`final mod`, ret);
  console.groupEnd();
  return ret;
}

console.groupCollapsed('generate mods');
console.time('generate mods time');
const mods = sources.map(generate);
console.log('generated mods', mods);
console.timeEnd('generate mods time');
console.groupEnd();

// all tags available
export const tags = mods.reduce((p, c) => {
  return [...p, ...c.tags.filter((i) => !p.includes(i))];
}, [] as string[]);

export default mods;
