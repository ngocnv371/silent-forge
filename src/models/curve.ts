import BezierEasing, { EasingFunction } from 'bezier-easing';
export type CurveType = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';

export interface Curve {
  min: number;
  max: number;
  type: CurveType;
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

export function applyCurve(curve: Curve, seed: number) {
  const { min, max, type } = curve;
  const func = curveFunctionFactory(type);
  if (!func) {
    throw new Error(`curve function '${type}' not found`);
  }
  return Math.floor(func(seed) * (max - min) + min);
}
