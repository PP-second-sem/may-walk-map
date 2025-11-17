import type { Route } from '../../types/map';
import './RouteCard.css';

interface RouteCardProps {
    route: Route;
    onSelect: (route: Route) => void;
    isSelected: boolean;
}

const RouteCard = ({ route, onSelect, isSelected }: RouteCardProps) => {
  return (
    <div className={`route-card ${isSelected ? 'route-card--selected' : ''}`} onClick={() => onSelect(route)}>
      {/* Фото слева */}
      <div className="route-card__image">
        {/* Временная заглушка */}
        <div style={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'white',
          fontSize: '12px'
        }}>
          Фото
        </div>
      </div>
      
      {/* Контент справа */}
      <div className="route-card__content">
        {/* Название */}
        <h3 className="route-card__name">{route.name}</h3>
        
        {/* Детали внизу */}
        <div className="route-card__details">
          <span className="route-card__year">{route.year} год</span>
          <span className="route-card__distance">{route.distance_km} км</span>
          <div className={`route-type-icon route-type-icon--${route.type}`} />
        </div>
      </div>
    </div>
  );
};

export default RouteCard;