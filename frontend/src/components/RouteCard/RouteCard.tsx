import type { Route } from '../../types/map';
import './RouteCard.css';
import { getRouteImageUrl } from '../../services/api';

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
        <img 
          src={getRouteImageUrl(route.map_image_url)}
          alt={`Маршрут ${route.name}`}
          className="route-card__photo"
        />
        </div>
      
      <div className="route-card__content">
        <h3 className="route-card__name">{route.name}</h3>
        
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