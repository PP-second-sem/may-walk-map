export interface Route {
  id: string;
  name: string;
  year: number;
  line_color: string;
  line_width: number;
  line_opacity: number;
  description: string;
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