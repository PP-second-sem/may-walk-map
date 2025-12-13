import { useEffect, useState, useCallback } from "react";
import './RoutesPanel.css';
import toolbarIcon from '../../assets/toolbar-icon.svg';
import RouteCard from "../RouteCard/RouteCard";
import type { MapFilters, Route } from "../../types/map";
import { apiService } from "../../services/api";
import RouteDetailsPanel from "../RouteDetailsPanel/RouteDetailsPanel";
import FiltersPanel from "../Filters/FiltersPanel";

interface RoutesPanelProps {
  onRouteSelect?: (route: Route | null) => void;
  onRoutesOnMapChange?: (routeIds: string[]) => void;
  onRoutesLoaded?: (routes: Route[]) => void;
}

const RoutesPanel = ({ onRouteSelect, onRoutesOnMapChange, onRoutesLoaded }: RoutesPanelProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [routes, setRoutes] = useState<Route[]>([]);
    const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
    const [routesOnMap, setRoutesOnMap] = useState<Set<string>>(new Set());
    const [filters, setFilters] = useState<MapFilters>({
        years: [2025],
        types: ['foot'],
        minDistance: 0,
        maxDistance: 50
    });

    const handleToggleMap = (route : Route) => {
        setRoutesOnMap(prev => {
            const newSet = new Set(prev);
            if (newSet.has(route.id)) {
                newSet.delete(route.id);
            } 
            else {
                newSet.add(route.id);
            }

            if (onRoutesOnMapChange) {
                onRoutesOnMapChange(Array.from(newSet));
            }
            return newSet;
        });
    };

    const handleFilterChange = useCallback((newFilters: MapFilters) => {
        setFilters(newFilters);
    }, []);

    const handleRouteSelect = (route : Route) => {
        if (selectedRoute?.id === route.id) {
            setSelectedRoute(null);
            if (onRouteSelect) {
                onRouteSelect(null);
            }
        } 
        else {
            setSelectedRoute(route);
            if (onRouteSelect) {
                onRouteSelect(route);
            }
        }
    };

    const handleCloseDetails = () => {
        setSelectedRoute(null);
    };

    useEffect(() => {
        if (routes.length > 0) {
            const filtered = routes.filter(route => {
                if (filters.years.length > 0 && !filters.years.includes(route.year)) {
                    return false;
                }

                 if (filters.types.length > 0 && !filters.types.includes(route.type)) {
                    return false;
                }

                if (route.distance_km < filters.minDistance || route.distance_km > filters.maxDistance) {
                    return false;
                }
                
                return true;
            });
            setFilteredRoutes(filtered);
        }
    }, [routes, filters]);

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
            setFilteredRoutes(routesData)
            if (onRoutesLoaded) {
                onRoutesLoaded(routesData);
            }
        }
        catch (err) {
            setError('Не удалось загрузить маршруты');
            console.error('Error loadings router:', err);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <>
            <FiltersPanel onFiltersChange={handleFilterChange} />
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
                    {!loading && !error && filteredRoutes.map(route => (
                        <RouteCard
                            key={route.id}
                            route={route}
                            onSelect={handleRouteSelect}
                            isSelected={selectedRoute?.id === route.id}
                            onToggleMap={handleToggleMap}
                            isOnMap={routesOnMap.has(route.id)}
                        />
                    ))}

                    {!loading && !error && filteredRoutes.length === 0 && (
                        <p>Маршруты не найдены</p>
                    )}
                </div>
                )}
            </div>
            {selectedRoute && (
                <RouteDetailsPanel route={selectedRoute} onClose={handleCloseDetails} />
            )} 
        </>
    );
};

export default RoutesPanel;