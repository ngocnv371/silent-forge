import Atlas from '../models/atlas';

const regions = require('./raw/atlas.json') as Atlas.Region[];

export const maps: Atlas.Map[] = regions.flatMap((r) => r.maps.map((m) => ({ ...m, region: r.id })));

export const tags = maps.reduce((p, c) => {
  return [...p, ...(c.tags || []).filter((i) => !p.includes(i))];
}, [] as string[]);

export default regions;
