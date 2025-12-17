import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import type { Route } from '../../types/map';
import mapFinishIcon from '../../assets/finish-icon.svg';
import footIcon from '../../assets/foot-start-icon.svg';
import cycleIcon from '../../assets/cycle-start-icon.svg';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  selectedRoute: Route | null;
  routesOnMap?: string[];
  allRoutes?: Route[];
}

const footStartIcon = L.icon({
  iconUrl: footIcon,
  iconSize: [32, 44],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const cycleStartIcon = L.icon({
  iconUrl: cycleIcon,
  iconSize: [49, 29],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32] 
});

const finishIcon = L.icon({
  iconUrl: mapFinishIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const RouteArrows = ({ positions, color }: { 
  positions: [number, number][]; 
  color: string;
}) => {
  const map = useMap();
  
  useEffect(() => {
    
    if (!positions || positions.length < 2) return;
    
    const layer = L.layerGroup();
    const EVERY_N_POINTS = 10;
    
    for (let i = EVERY_N_POINTS; i < positions.length - 1; i += EVERY_N_POINTS) {
      const currentPoint = positions[i];
      const nextPoint = positions[Math.min(i + 1, positions.length - 1)];
      
      const dx = nextPoint[1] - currentPoint[1];
      const dy = currentPoint[0] - nextPoint[0];
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      
      const arrowIcon = L.divIcon({
        html: `
          <div style="
            transform: rotate(${angle}deg);
            width: 30px;
            height: 30px;
            color: red;
            font-size: 24px;
            text-align: center;
            line-height: 30px;
          ">➤</div>
        `,
        className: 'route-arrow',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });
      
      L.marker(currentPoint, { icon: arrowIcon, interactive: false, bubblingMouseEvents: false }).addTo(layer);
    }
    
    layer.addTo(map);
    
    return () => {
      map.removeLayer(layer);
    };
  }, [positions, color, map]);
  
  return null;
};

const MapComponent = ({ routesOnMap = [], allRoutes = [] }: MapComponentProps) => {  
  const parseGeoJSON = (geoJsonString: string): [number, number][] => {
    try {
      const geoJson = JSON.parse(geoJsonString);
      if (geoJson.features && geoJson.features.length > 0) {
        const coordinates = geoJson.features[0].geometry.coordinates;
        return coordinates.map((coord: number[]) => [coord[1], coord[0]]);
      }
    } catch (error) {
      console.error('Ошибка парсинга:', error);
    }
    return [];
  };

  const getRouteStartEndPoints = (geoJsonString: string) => {
    try {
      const geoJson = JSON.parse(geoJsonString);
      if (geoJson.features && geoJson.features.length > 0) {
        const coordinates = geoJson.features[0].geometry.coordinates;
        if (coordinates.length >= 2) {
          const start = coordinates[0];
          const finish = coordinates[coordinates.length - 1];
          return {
            start: [start[1], start[0]] as [number, number],
            finish: [finish[1], finish[0]] as [number, number]
          };
        }
      }
    } catch (error) {
      console.error('Ошибка парсинга точек старта/финиша:', error);
    }
    return null;
  };

  const routesWithArrows = routesOnMap;

  return (
    <MapContainer
      center={[56.8389, 60.6057]}
      zoom={12}
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
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {allRoutes
        .filter(route => routesOnMap.includes(route.id))
        .map(route => {
          const positions = parseGeoJSON(route.track_geojson);
          const routeColor = route.type === 'foot' ? '#4835F2' : '#35F274';
          const points = getRouteStartEndPoints(route.track_geojson);
          const hasArrows = routesWithArrows.includes(route.id);
          
          if (positions.length < 2) return null;
          
          return (
            <div key={`route-${route.id}`}>
              <Polyline
                pathOptions={{
                  color: routeColor,
                  weight: 6,
                  opacity: 1.0
                }}
                positions={positions}
              />
              
              {hasArrows && positions.length > 10 && (
                <RouteArrows 
                  positions={positions}
                  color={routeColor}
                />
              )}

              {points?.start && (
                <Marker
                  position={points.start}
                  icon={route.type === 'foot' ? footStartIcon : cycleStartIcon}
                  >
                </Marker>
              )}

              {points?.finish && (
                <Marker
                  position={points.finish}
                  icon={finishIcon}>

                </Marker>
              )}
            </div>
          );
        })
      }
    </MapContainer>
  );
};

export default MapComponent;