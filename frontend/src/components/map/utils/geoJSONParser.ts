export type PositionTuple = [number, number];

export const parseGeoJSON = (geoJsonString: string): PositionTuple[] => {
  try {
    const geoJson = JSON.parse(geoJsonString);
    if (geoJson.features?.[0]?.geometry?.coordinates) {
      return geoJson.features[0].geometry.coordinates.map(
        (coord: number[]) => [coord[1], coord[0]]
      );
    }
  } catch (error) {
    console.error('Ошибка парсинга GeoJSON:', error);
  }
  return [];
};

export const getRoutePoints = (
  geoJsonString: string
): { start: PositionTuple; finish: PositionTuple } | null => {
  try {
    const geoJson = JSON.parse(geoJsonString);
    const coordinates = geoJson.features?.[0]?.geometry?.coordinates;
    if (coordinates?.length >= 2) {
      return {
        start: [coordinates[0][1], coordinates[0][0]],
        finish: [coordinates[coordinates.length - 1][1], coordinates[coordinates.length - 1][0]],
      };
    }
  } catch (error) {
    console.error('Ошибка получения точек маршрута:', error);
  }
  return null;
};