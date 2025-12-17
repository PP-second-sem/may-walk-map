import type { Route } from '../../types/map';
import './RouteCard.css';
import { getRouteImageUrl } from '../../services/api';
import cycleChooseRoad from '../../assets/cycle-choose-road.svg';
import footChooseRoad from '../../assets/foot-choose-road.svg';
import defaultIcon from '../../assets/default_icon.svg';
import footIcon from '../../assets/foot_icon.svg';
import cycleIcon from '../../assets/bike_icon.svg'

interface RouteCardProps {
    route: Route;
    onSelect: (route: Route) => void;
    onToggleMap: (route: Route) => void;
    isSelected: boolean;
    isOnMap: boolean;
}

const RouteCard = ({ route, onSelect, onToggleMap, isSelected, isOnMap }: RouteCardProps) => {
  const handleCardCLick = () => {
    onSelect(route);
  }

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleMap(route);
  };

  return (
    <div className={`route-card ${isSelected ? 'route-card--selected' : ''}`} onClick={handleCardCLick}>
      <div className="route-card__corner-icons" onClick={handleIconClick}>
        <img 
          src={defaultIcon}
          className="route-card__hole-icon"
          alt=""
        />
        
        {isOnMap && (
          <img 
            src={route.type === 'foot' ? footChooseRoad : cycleChooseRoad} 
            className="route-card__fill-icon"
            alt="Маршрут отображается на карте"
          />
        )}
      </div>

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
          <img 
            src={route.type === "foot" ? footIcon : cycleIcon}
            className='route-type-icon' />
        </div>
      </div>
    </div>
  );
};

export default RouteCard;