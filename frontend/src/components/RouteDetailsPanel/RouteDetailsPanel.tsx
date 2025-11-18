import type { Route } from '../../types/map';
import './RouteDetailsPanel.css';
import websiteIcon from '../../assets/export_button.svg';
import downloadIcon from '../../assets/download_button.svg';
import closeIcon from '../../assets/close_button.svg';

interface RouteDetailsPanelProps {
    route: Route;
    onClose: () => void;
}

const RouteDetailsPanel = ({ onClose }: RouteDetailsPanelProps) => {
    return (
        <div className="route-details-panel">
            <div className="route-details-header">
            </div>
            
            <div className="route-details-image-container">
                <div className="route-details-image">
                    {/* Заглушка для фото */}
                    <div className="image-placeholder">Фото маршрута</div>
                </div>

                <div className='image-actions'>
                    <button className='action-button'>
                        <img src={websiteIcon} alt='Перейти на сайт'></img>
                    </button>
                    <button className='action-button'>
                        <img src={downloadIcon} alt='Скачать фото'></img>
                    </button>
                    <button className='action-button' onClick={onClose}>
                        <img src={closeIcon} alt="Закрыть доп информацию"></img>
                    </button>
                </div>
                
                <div className="route-details-info">
                </div>
            </div>
        </div>
    );
};

export default RouteDetailsPanel;