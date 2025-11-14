import { apiFetch } from './apiClient.js';
const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/category`;

export async function getCategories() {
  try {
    return await apiFetch(API_URL);
  } catch (err) {
    console.error('Fel vid hämtning av kategorier:', err);
    throw err;
  }
}
