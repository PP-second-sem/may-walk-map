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
  weight, 
  opacity 
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