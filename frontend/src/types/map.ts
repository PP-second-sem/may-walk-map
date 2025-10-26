export interface Route {
  id: string;
  year: number;
  distance: number;
  type: 'walking' | 'cycling';
  startLocation: string;
  gpxFile: string;
  color?: string;
}

export interface MapFilters {
  years: number[];
  types: string[];
  minDistance: number;
  maxDistance: number;
}