import { MapContainer, TileLayer } from 'react-leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const RemoveLeafletAttribution = () => {
  const map = useMap();
  
  useEffect(() => {
    // Удаляем стандартную атрибуцию Leaflet
    const attributionElement = document.querySelector('.leaflet-control-attribution');
    if (attributionElement) {
      attributionElement.remove();
    }
  }, [map]);

  return null;
};

const MapComponent = () => {
  return (
    <MapContainer
      center={[56.8389, 60.6057]} // Координаты Екатеринбурга
      zoom={10}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Карта Майской прогулки"
      />
      <RemoveLeafletAttribution />
    </MapContainer>
  );
};

export default MapComponent;