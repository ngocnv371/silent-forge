export interface Zone {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
}

export interface Region {
  id: string;
  name: string;
  zones: Zone[];
}
