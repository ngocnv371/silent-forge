namespace Atlas {
  export type EncounterType = 'resource' | 'monster';

  export interface Encounter {
    type: EncounterType;
    name: string;
    weight: number;
  }
  export interface EncounterInstance {
    name: string;
    level: number;
  }
  export interface Map {
    id: string;
    name: string;
    region: string;
    length: [number, number];
    tags: string[];
    encounters: Encounter[];
  }
  export interface Region {
    id: string;
    name: string;
    maps: Map[];
  }
}

export default Atlas;
