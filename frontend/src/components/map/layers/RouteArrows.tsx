import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import { ARROWS_EVERY_N_POINTS } from '../utils/constants';

interface RouteArrowsProps {
  positions: [number, number][];
  color: string;
}

export const RouteArrows = ({ positions, color }: RouteArrowsProps) => {
  const map = useMap();
  
  useEffect(() => {
    if (positions.length < 2) return;
    
    const layer = L.layerGroup();
    
    for (let i = ARROWS_EVERY_N_POINTS; i < positions.length - 1; i += ARROWS_EVERY_N_POINTS) {
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
      
      L.marker(currentPoint, { 
        icon: arrowIcon, 
        interactive: false, 
        bubblingMouseEvents: false 
      }).addTo(layer);
    }
    
    layer.addTo(map);
    return () => { map.removeLayer(layer); };
  }, [positions, color, map]);
  
  return null;
};