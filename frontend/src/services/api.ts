import type { Route } from '../types/map';

const API_BASE = 'http://localhost:8000';

export const apiService = {
    async getRoutes(): Promise<Route[]> {
        const response = await fetch(`${API_BASE}/map/api/routes/`);
        if (!response.ok) {
            throw new Error('Failed to fetch routes');
        }
        return response.json();
    }
};