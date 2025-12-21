import L from 'leaflet';
import mapFinishIcon from '../../../assets/finish-icon.svg';
import footIcon from '../../../assets/foot-start-icon.svg';
import cycleIcon from '../../../assets/cycle-start-icon.svg';

export const createIcons = () => ({
  footStartIcon: L.icon({
    iconUrl: footIcon,
    iconSize: [32, 44],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  }),
  cycleStartIcon: L.icon({
    iconUrl: cycleIcon,
    iconSize: [49, 29],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32] 
  }),
  finishIcon: L.icon({
    iconUrl: mapFinishIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  })
});