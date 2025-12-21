import { Polyline } from 'react-leaflet';

interface RouteLineProps {
  positions: [number, number][];
  color: string;
  weight: number;
  opacity: number;
}

export const RouteLine = ({ 
  positions, 
  color, 
  weight = 6, 
  opacity = 1.0 
}: RouteLineProps) => {
  return (
    <Polyline
      pathOptions={{
        color,
        weight,
        opacity,
        lineCap: 'round',
        lineJoin: 'round'
      }}
      positions={positions}
    />
  );
};