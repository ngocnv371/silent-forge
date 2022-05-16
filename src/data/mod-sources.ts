import BezierEasing, { EasingFunction } from 'bezier-easing';

const NUM_TIERS = 9;
const sources = require('./raw/mod-sources.json') as Mod[];

type CurveType = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';

interface Curve {
  min: number;
  max: number;
  type: CurveType;
}

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

function curveFunctionFactory(type: CurveType): EasingFunction {
  const defaultCurves: { [key in CurveType]: EasingFunction } = {
    linear: BezierEasing(0, 0, 1, 1),
    ease: BezierEasing(0.25, 0.1, 0.25, 1),
    'ease-in': BezierEasing(0.42, 0, 1, 1),
    'ease-out': BezierEasing(0, 0, 0.58, 1),
    'ease-in-out': BezierEasing(0.42, 0, 0.58, 1),
  };
  return defaultCurves[type];
}

function generate(mod: Mod) {
  function applyCurve(curve: Curve, index: number) {
    const { min, max, type } = curve;
    const func = curveFunctionFactory(type);
    if (!func) {
      throw new Error(`curve function '${type}' not found`);
    }
    return Math.floor(func(index) * (max - min) + min);
  }
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

const mods = sources.map(generate);
console.log('generated mods', mods);

export default mods;
