import type { Route } from '../../types/map';
import { getRouteImageUrl } from '../../services/api';
import './RouteDetailsPanel.css';
import websiteIcon from '../../assets/export_button.svg';
import downloadIcon from '../../assets/download_button.svg';
import closeIcon from '../../assets/close_button.svg';
import { useState } from 'react';

interface RouteDetailsPanelProps {
    route: Route;
    onClose: () => void;
}

const RouteDetailsPanel = ({ route, onClose }: RouteDetailsPanelProps) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadGPX = async () => {
        if (!route.gpx_file) {
            alert('Файл недоступен для скачивания');
        };

        setIsDownloading(true);
        try {
            window.open(route.gpx_file, '_blank');    
        } 

        catch (error) {
            console.error('Download error:', error);
            alert('Не удалось скачать маршрут');
        }

        finally {
            setIsDownloading(false);
        };
    };
    
    return (
        <div className="route-details-panel">
            <div className="route-details-header">
            </div>
            
            <div className="route-details-image-container">
                <div className="route-details-image">
                    <img 
                    src={getRouteImageUrl(route.map_image_url)}
                    alt={`Маршрут: ${route.name}`}
                    className='route-details-image'
                    />
                </div>
                <div className='route-details-text'>
                    <h2 className='route-details-title'>{route.name}</h2>
                    <p className='route-details-description'>{route.description}</p>
                </div>

                <div className='image-actions'>
                    <button className='action-button'>
                        <img src={websiteIcon} alt='Перейти на сайт'></img>
                    </button>
                    <button className='action-button' 
                        title='Скачать gpx файл маршрута'
                        onClick={handleDownloadGPX}
                        disabled={isDownloading || !route.gpx_file}
                    >
                        <img src={downloadIcon}></img>
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