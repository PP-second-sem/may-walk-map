import { useState } from 'react';
import MapComponent from './components/map/mapComponent';
import Navigation from './components/Header/Navigation';
import RoutesPanel from './components/RoutesPanel/RoutesPanel';
import { MapSwitcherButton } from './components/MapSwitcherButton/MapSwitcherButton';
import type { Route } from './types/map';
import './App.css';

function App() {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [routesOnMap, setRoutesOnMap] = useState<string[]>([]);
  const [allRoutes, setAllRoutes] = useState<Route[]>([]);
  const [mapType, setMapType] = useState<'openstreet' | 'yandex' | '2gis'>('openstreet');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleRoutesLoaded = (routes: Route[]) => {
    setAllRoutes(routes);
  };

  return (
    <div className="App">
      <Navigation />
      <MapComponent 
        selectedRoute={selectedRoute}
        routesOnMap={routesOnMap}
        allRoutes={allRoutes}
        mapType={mapType}
      />
      <RoutesPanel
        onRouteSelect={setSelectedRoute}
        onRoutesOnMapChange={setRoutesOnMap}
        onRoutesLoaded={handleRoutesLoaded}
        onToggle={setIsFiltersOpen}
      />
      <MapSwitcherButton 
        currentMap={mapType}
        onMapChange={setMapType}
        isFiltersOpen={isFiltersOpen} />
    </div>
  );
}

export default App; 