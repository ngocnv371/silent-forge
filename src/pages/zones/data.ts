import { Region } from "../../models/zone";

export const regions = require('../../data/zones.json') as Region[];
export const zones = regions.flatMap(r => r.zones);
