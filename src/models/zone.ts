export interface Reward {
  name: string;
  weight: number;
}

export interface Encounter {
  name: string;
  weight: number;
  rewards: []
}

export interface Zone {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
  encounters: Encounter[];
}

export interface Region {
  id: string;
  name: string;
  zones: Zone[];
}
