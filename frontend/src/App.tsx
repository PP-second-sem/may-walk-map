import MapComponent from './components/map/mapComponent';
import Navigation from './components/Header/Navigation';
import './App.css';

import RoutesPanel from './components/RoutesPanel/RoutesPanel';

function App() {
  return (
    <div className="App">
      <Navigation />

      <MapComponent />
      <RoutesPanel />
    </div>
  );
}

export default App;