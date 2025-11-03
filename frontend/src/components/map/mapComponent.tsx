import { MapContainer, TileLayer } from 'react-leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

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

const MapComponent = () => {
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
      <RemoveLeafletAttribution />
    </MapContainer>
  );
};

export default MapComponent;