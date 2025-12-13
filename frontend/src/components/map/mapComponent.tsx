import { MapContainer, TileLayer, Polyline, Popup, Marker } from 'react-leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import type { Route } from '../../types/map';
import mapFinishIcon from '../../assets/finish-icon.svg';
import footIcon from '../../assets/foot-start-icon.svg';
import cycleIcon from '../../assets/cycle-start-icon.svg';

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


const RemoveLeafletAttribution = () => {
  const map = useMap();
  
  useEffect(() => {
    const attributionElement = document.querySelector('.leaflet-control-attribution');
    if (attributionElement) {
      attributionElement.remove();
    }
  }, [map]);

  return null;
};

const MapComponent = ({ routesOnMap = [], allRoutes = [] }: MapComponentProps) => {
  
  const parseGeoJSON = (geoJsonString: string) => {
    try {
      const geoJson = JSON.parse(geoJsonString);
      if (geoJson.features && geoJson.features.length > 0) {
        const coordinates = geoJson.features[0].geometry.coordinates;
        return coordinates.map((coord: number[]) => [coord[1], coord[0]]);
      }
    } catch (error) {
      console.error('Ошибка парсинга GeoJSON:', error);
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

  return (
    <MapContainer
      center={[56.8389, 60.6057]}
      zoom={10}
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
        attribution=""
      />
      
      {allRoutes
        .filter(route => routesOnMap.includes(route.id))
        .map(route => {
          const points = getRouteStartEndPoints(route.track_geojson);
          
          return (
            <div key={`route-${route.id}`}>
              <Polyline
                pathOptions={{
                  color: route.type === 'foot' ? 'rgba(72, 53, 242, 1)' : 'rgba(53, 242, 116, 1)',
                  weight: 8,
                  opacity: 1.0
                }}
                positions={parseGeoJSON(route.track_geojson)}
              >
                <Popup>
                  <div style={{ padding: '5px' }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>{route.name}</h3>
                    <p><strong>Год:</strong> {route.year}</p>
                    <p><strong>Дистанция:</strong> {route.distance_km} км</p>
                  </div>
                </Popup>
              </Polyline>
      
              {points?.start && (
                <Marker 
                  position={points.start}
                  icon={route.type === 'foot' ? footStartIcon : cycleStartIcon}
                >
                  <Popup>
                    <strong>Старт:</strong> {route.name}<br />
                    {route.start_location}
                  </Popup>
                </Marker>
              )}
              
              {points?.finish && (
                <Marker 
                  position={points.finish}
                  icon={finishIcon}
                >
                  <Popup>
                    <strong>Финиш:</strong> {route.name}<br />
                    Дистанция: {route.distance_km} км
                  </Popup>
                </Marker>
              )}
            </div>
          );
        })
      }
      
      <RemoveLeafletAttribution />
    </MapContainer>
  );
};

export default MapComponent;