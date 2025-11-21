export interface Route {
  id: string;
  name: string;
  year: number;
  type: 'foot' | 'bike';
  distance_km: number;
  start_location: string;
  track_geojson: string;
  map_image_url: string;
}

export interface MapFilters {
  years: number[];
  types: string[];
  minDistance: number;
  maxDistance: number;
}