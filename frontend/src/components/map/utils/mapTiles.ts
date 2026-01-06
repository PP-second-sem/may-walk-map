export type MapType = 'openstreet' | 'yandex' | '2gis';

export interface MapTileConfig {
  url: string;
  attribution: string;
  subdomains?: string;
}

export const mapTileConfigs: Record<MapType, MapTileConfig> = {
  openstreet: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abc'
  },
  yandex: {
    url: 'https://core-renderer-tiles.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}&scale=1&lang=ru_RU',
    attribution: '&copy; <a href="https://yandex.ru">Яндекс</a>'
  },
  '2gis': {
    url: 'https://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}',
    attribution: '&copy; <a href="https://2gis.ru">2ГИС</a>'
  },
};
