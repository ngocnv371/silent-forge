import { Region } from '../models/zone';

export const regions = require('./raw/zones.json') as Region[];
export const zones = regions.flatMap((r) => r.zones);
