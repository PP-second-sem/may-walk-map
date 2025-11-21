import type { Route } from '../types/map';

const API_BASE = 'http://localhost:8000';

export const apiService = {
    async getRoutes(): Promise<Route[]> {
        const response = await fetch(`${API_BASE}/map/api/routes/`);
        if (!response.ok) {
            throw new Error('Failed to fetch routes');
        }
        const routes: Route[] = await response.json();
        return routes;
    }
};

export const getRouteImageUrl = (map_image_url: string): string => {
    return `${API_BASE}${map_image_url}`;
};