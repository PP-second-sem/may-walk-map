import MapComponent from './components/map/mapComponent';
import Navigation from './components/Header/Navigation';
import './App.css';
import { useState } from 'react';
import RoutesPanel from './components/RoutesPanel/RoutesPanel';
import type { Route } from './types/map';

function App() {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [routesOnMap, setRoutesOnMap] = useState<string[]>([]);
  const [allRoutes, setAllRoutes] = useState<Route[]>([]);
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
      />
      <RoutesPanel 
        onRouteSelect={setSelectedRoute}
        onRoutesOnMapChange={setRoutesOnMap}
        onRoutesLoaded={handleRoutesLoaded}
      />
    </div>
  );
}

export default App;