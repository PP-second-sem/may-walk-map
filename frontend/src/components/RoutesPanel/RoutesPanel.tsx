import { useState } from "react";
import './RoutesPanel.css';
import toolbarIcon from '../../assets/toolbar-icon.svg';


const RoutesPanel = () => {
    const [isOpen, setIsOpen] = useState(false);

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
                    <p>Список маршрутов появится здесь</p>
            </div>
        )}
        </div>
    );
};

export default RoutesPanel;