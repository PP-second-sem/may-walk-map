import { useMemo } from 'react';
import type { Route } from '../../../types/map';
import { parseGeoJSON, getRoutePoints } from '../utils/geoJSONParser';
import { ROUTE_COLORS } from '../utils/constants';

export const useRouteData = (routes: Route[]) => {
  return useMemo(() => {
    return routes.map(route => {
      const positions = parseGeoJSON(route.track_geojson);
      const points = getRoutePoints(route.track_geojson);
      const color = ROUTE_COLORS[route.type];

      return {
        route,
        positions,
        startPoint: points?.start || null,
        finishPoint: points?.finish || null,
        color,
        isValid: positions.length >= 2,
      };
    });
  }, [routes]);
};