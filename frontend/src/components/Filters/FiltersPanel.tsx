import { useEffect, useState } from 'react';
import type { MapFilters } from "../../types/map";
import './FiltersPanel.css';
import filterIcon from '../../assets/filter-icon.svg';
import toolbarIcon from '../../assets/toolbar-icon.svg';
import defaultIcon from '../../assets/default_icon.svg';
import chooseIcon from '../../assets/choose_icon.svg';
import footIcon from '../../assets/foot_icon.svg';
import bikeIcon from '../../assets/bike_icon.svg';

interface FiltersPanelProps {
  onFiltersChange: (filters: MapFilters) => void;
  availableYears?: number[];
  onToggle?: (isOpen: boolean) => void;
}

const FiltersPanel = ({ onFiltersChange: onFiltersChange, availableYears = [], onToggle } : FiltersPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [distanceRange, setDistanceRange] = useState([0, 50]);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onToggle?.(newIsOpen);
  };

  const routeTypes = [
    { id: 'foot', label: 'Пеший', icon: footIcon },
    { id: 'bike', label: 'Вело', icon: bikeIcon },
  ]

  useEffect(() => {
        const newFilters: MapFilters = {
            years: selectedYear.map(year => parseInt(year)),
            types: selectedType,
            minDistance: distanceRange[0],
            maxDistance: distanceRange[1]
        };
        onFiltersChange(newFilters);
    }, [selectedYear, selectedType, distanceRange, onFiltersChange])

  const toggleYear = (year: string) => {
    setSelectedYear(prev =>
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    );
  };

  const years = availableYears
    .map(y => y.toString())
    .sort((a, b) => parseInt(b) - parseInt(a));

  const toggleType = (typeId: string) => {
    setSelectedType(prev => 
      prev.includes(typeId) ? prev.filter(t => t !== typeId) : [...prev, typeId]
    )
  };

  const handleMinChange = (minValue: number) => {
    const newMin = Math.min(minValue, distanceRange[1]);
    setDistanceRange([newMin, distanceRange[1]]);
  };

  const handleMaxChange = (maxValue: number) => {
    const newMax = Math.max(maxValue, distanceRange[0]);
    setDistanceRange([distanceRange[0], newMax]);
  };

  return (
    <div className={`filters-panel ${isOpen ? 'filters-panel--open' : ''}`}>
      <div className="filters-header" onClick={handleToggle}>
        <span className="filters-title">Фильтры</span>
        <img 
          src={filterIcon} 
          alt="Фильтры"
          className= "filters-icon"
        />
      </div>
      
      {isOpen && (
        <div className="filters-content">
          <div className='filter-section'>
             <div className={`filter-section-header ${isYearOpen ? 'active' : ''}`} onClick={() => setIsYearOpen(!isYearOpen)}>
              <span className="filter-section-title">Год маршрута</span>
              <img src={toolbarIcon} alt="Год" className="filter-section-icon" />
            </div>

            {isYearOpen && (
              <div className='years-list'>
                {years.map(year => (
                  <div
                  key={year}
                  className={"year-item"}
                  onClick={() => toggleYear(year)}
                >
                  <span>{year}</span>
                  <img 
                    src={selectedYear.includes(year) ? chooseIcon : defaultIcon}
                    alt={selectedYear.includes(year) ? 'Выбрано' : 'Не выбрано'}
                    className='year-check-icon'
                  />
                </div>
                ))}
              </div>
            )}
          </div>

          <div className='distance-filter-section'>
            <div className='distance-filter-header'>
              <span className='distance-filter-title'>Протяжённость маршрута</span>
            </div>

            <div className='distance-slider-container'>
              <div className='slider-wrapper'>
                <div className='slider-track'></div>
                <div className="slider-value-min" style={{ left: `${(distanceRange[0] / 50) * 100}%` }}>
                  {distanceRange[0]} км
                </div>
                <div className="slider-value-max" style={{ left: `${(distanceRange[1] / 50) * 100}%` }}>
                  {distanceRange[1]} км
                </div>
  
                <div 
                  className="active-track"
                  style={{
                    left: `${(distanceRange[0] / 50) * 100}%`,
                    width: `${((distanceRange[1] - distanceRange[0]) / 50) * 100}%`
                  }}
                />
                <input
                type='range'
                min='0'
                max='50'
                step='1'
                value={distanceRange[0]}
                onChange={(e) => handleMinChange(Number(e.target.value))}
                className='slider slider-min'
                />
                <input
                  type='range'
                  min='0'
                  max='50'
                  step='1'
                  value={distanceRange[1]}
                  onChange={(e) => handleMaxChange(Number(e.target.value))}
                  className='slider slider-max'
                />
              </div>
            </div>
          </div>

          <div className='type-filter-section'>
            <div className='type-section-header'>
              <span className='type-section-title'>Тип маршрута</span>
            </div>

            <div className="types-container">
              {routeTypes.map(type => (
                <div
                  key={type.id}
                  className="type-option"
                  onClick={() => toggleType(type.id)}
                >
                  <img 
                    src={type.icon}
                    alt={type.label}
                    className='type-icon'
                  />
                  <img 
                    src={selectedType.includes(type.id) ? chooseIcon : defaultIcon}
                    alt={selectedType.includes(type.id) ? 'Выбрано' : 'Не выбрано'}
                    className='type-check-icon'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersPanel;