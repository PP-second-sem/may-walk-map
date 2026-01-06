import { MapContainer, TileLayer } from 'react-leaflet';
import type { Route } from '../../types/map';
import { RouteLine } from './layers/RouteLine';
import { RouteArrows } from './layers/RouteArrows';
import { RouteMarkers } from './layers/RouteMarkers';
import { useRouteData } from './hooks/useRouteData';
import { MAP_CENTER, MAP_ZOOM, MIN_POINTS_FOR_ARROWS } from './utils/constants';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  selectedRoute: Route | null;
  routesOnMap?: string[];
  allRoutes?: Route[];
  mapType?: 'openstreet' | 'yandex' | '2gis';
}

const MapComponent = ({ 
  routesOnMap = [], 
  allRoutes = [], 
  mapType = 'openstreet'
}: MapComponentProps) => {
  const routesToDisplay = allRoutes.filter(route => routesOnMap.includes(route.id));
  const routesData = useRouteData(routesToDisplay);
  
  const getTileUrl = () => {
    switch(mapType) {
      case 'yandex':
        return 'https://core-renderer-tiles.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}&scale=1&lang=ru_RU';
      case '2gis':
        return 'https://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}';
      case 'openstreet':
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }
  };

  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={MAP_ZOOM}
      attributionControl={false}
      style={{ 
        height: '100vh', 
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1 
      }}
    >
      <TileLayer url={getTileUrl()} />
      
      {routesData.map(({ route, positions, startPoint, finishPoint, color, isValid }) => {
        if (!isValid) return null;
        
        const shouldShowArrows = positions.length >= MIN_POINTS_FOR_ARROWS;
        
        return (
          <div key={`route-${route.id}`}>
            <RouteLine 
              weight={route.line_width} 
              opacity={route.line_opacity} 
              positions={positions} 
              color={route.line_color} 
            />
            
            {shouldShowArrows && (
              <RouteArrows positions={positions} color={color} />
            )}
            
            <RouteMarkers 
              route={route}
              startPoint={startPoint}
              finishPoint={finishPoint}
            />
          </div>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;