import { useState } from 'react';
import './FiltersPanel.css';
import filterIcon from '../../assets/filter-icon.svg';

const FiltersPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`filters-panel ${isOpen ? 'filters-panel--open' : ''}`}>
      <div className="filters-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="filters-title">Фильтры</span>
        <img 
          src={filterIcon} 
          alt="Фильтры"
          className= "filters-icon"
        />
      </div>
      
      {isOpen && (
        <div className="filters-content">
          <p>Фильтры по годам, типу и дистанции появятся здесь</p>
        </div>
      )}
    </div>
  );
};

export default FiltersPanel;