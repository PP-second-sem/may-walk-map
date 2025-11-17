import { useEffect, useState } from "react";
import './RoutesPanel.css';
import toolbarIcon from '../../assets/toolbar-icon.svg';
import RouteCard from "../RouteCard/RouteCard";
import type { Route } from "../../types/map";
import { apiService } from "../../services/api";


const RoutesPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [routes, setRoutes] = useState<Route[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen && routes.length === 0) {
            loadRoutes();
        }
    }, [isOpen]);

    const loadRoutes = async () => {
        setLoading(true),
        setError(null);
        try {
            const routesData = await apiService.getRoutes();
            setRoutes(routesData);
        }
        catch (err) {
            setError('Не удалось загрузить маршруты');
            console.error('Error loadings router:', err);
        }
        finally {
            setLoading(false);
        }
    };

    const handleRouteSelected = (route: Route) => {
        console.log('Selected route:', route);
    };

    return (
        <div className={`routes-panel ${isOpen ? 'routes-panel--open' : ''}`}>
            <div className="routes-header" onClick={() => setIsOpen(!isOpen)}>
                <span className="routes-title">Маршруты</span>
                <img 
                    src={toolbarIcon}
                    alt="Раскрытие маршрутов"
                    className="toolbar-icon"
                />
            </div>

            {isOpen && (
            <div className="routes-content">
                {loading && <p>Загрузка маршрутов...</p>}
                {error && <p className="error">{error}</p>}
                {!loading && !error && routes.map(route => (
                    <RouteCard
                        key={route.id}
                        route={route}
                        onSelect={handleRouteSelected}
                    />
                ))}
                {!loading && !error && routes.length === 0 && (
                    <p>Маршруты не найдены</p>
                )}
            </div>
            )}
        </div>
    );
};

export default RoutesPanel;