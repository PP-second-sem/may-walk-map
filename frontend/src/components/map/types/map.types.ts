import type { Route } from '../../../types/map';

export type PositionTuple = [number, number];

export interface MapComponentProps {
  selectedRoute: Route | null;
  routesOnMap?: string[];
  allRoutes?: Route[];
}

export interface RouteLayerProps {
  route: Route;
  showArrows: boolean;
}

export interface ArrowLayerProps {
  positions: PositionTuple[];
  color: string;
}

export interface RouteData {
  positions: PositionTuple[];
  startPoint: PositionTuple | null;
  finishPoint: PositionTuple | null;
  color: string;
}