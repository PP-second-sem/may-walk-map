import type { Route } from '../../types/map';
import './RouteCard.css';

interface RouteCardProps {
    route: Route;
    onSelect: (route: Route) => void;
}

const RouteCard = ({ route, onSelect }: RouteCardProps) => {
    const typeLabels = {
        foot: 'Пеший',
        bike: 'Велосипедный'
    };
    
    return (
        <div className="route-card" onClick={() => onSelect(route)}>
            <div className="route-card__info">
                <h4 className="route-card__name">{route.name}</h4>
                <div className="route-card__details">
                    <span className="route-card__year">{route.year} год</span>
                    <span className="route-card__distance">{route.distance_km} км</span>
                    <span className={`route-card__type route-card__type--${route.type}`}>
                    {typeLabels[route.type]}
          </span>
        </div>
      </div>
    </div>
    );
};

export default RouteCard;