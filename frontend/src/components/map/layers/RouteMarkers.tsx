import { Marker } from 'react-leaflet';
import type { Route } from '../../../types/map';
import { createIcons } from '../utils/icons';

interface RouteMarkersProps {
  route: Route;
  startPoint: [number, number] | null;
  finishPoint: [number, number] | null;
}

export const RouteMarkers = ({ 
  route, 
  startPoint, 
  finishPoint 
}: RouteMarkersProps) => {
  const { footStartIcon, cycleStartIcon, finishIcon } = createIcons();
  const startIcon = route.type === 'foot' ? footStartIcon : cycleStartIcon;
  
  return (
    <>
      {startPoint && (
        <Marker position={startPoint} icon={startIcon} />
      )}
      {finishPoint && (
        <Marker position={finishPoint} icon={finishIcon} />
      )}
    </>
  );
};