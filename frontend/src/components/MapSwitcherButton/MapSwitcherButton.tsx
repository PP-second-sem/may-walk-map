import './MapSwitcherButton.css';
import OSM_Icon from '../../assets/OSM_icon.svg'
import doubleGisIcon from '../../assets/2gis-img.png'

type MapType = 'openstreet' | 'yandex' | '2gis';

interface MapSwitcherButtonProps {
  currentMap: MapType;
  onMapChange: (mapType: MapType) => void;
  isFiltersOpen: boolean;
  isRoutesOpen: boolean;
}

export const MapSwitcherButton = ({ currentMap, onMapChange, isFiltersOpen = false, isRoutesOpen = false }: MapSwitcherButtonProps) => {
  const maps = [
    { 
      id: 'openstreet' as const, 
      label: <img src={OSM_Icon} width='38' height='38'></img>, 
      title: 'OpenStreetMap',
      color: '#DB6E4B'
    },
    { 
      id: '2gis' as const, 
      label: <img src={doubleGisIcon} width='43' height='43'></img>, 
      title: '2ГИС',
      color: '#08a108'
    },
  ];

  return (
    <div className="map-type-buttons"
        style={{
            right: isRoutesOpen && isFiltersOpen ? '400px' : '10px'
        }}>
      {maps.map((map) => (
        <button
          key={map.id}
          className={`map-type-button ${currentMap === map.id ? 'active' : ''}`}
          onClick={() => onMapChange(map.id)}
          title={map.title}
          style={{ 
            color: currentMap === map.id ? map.color : '#000',
            borderColor: currentMap === map.id ? map.color : '#ddd'
          }}
        >
          {map.label}
        </button>
      ))}
    </div>
  );
};

export default MapSwitcherButton;