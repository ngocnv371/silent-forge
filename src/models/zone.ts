export interface Zone {
  id: string;
  name: string;
  price: number;
}

export interface Region {
    id: string;
    name: string;
    zones: Zone[];
  }