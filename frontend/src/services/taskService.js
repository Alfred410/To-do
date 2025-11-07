import { apiFetch } from './apiClient.js';
const API_URL = 'http://localhost:3000/api/task';

export async function getTasks() {
  try {
    return await apiFetch(`${API_URL}`);
  } catch (err) {
    console.error('Fel vid hämtning av uppgifter:', err);
    throw err;
  }
}

export async function addTask(task) {
  try {
    return await apiFetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(task),
    });
  } catch (err) {
    console.error('Fel vid skapande av uppgift:', err);
    throw err;
  }
}

export async function updateTask(id, updates) {
  try {
    const body = {};
    if (updates.completed !== undefined)
      body.completed = Boolean(updates.completed);
    if (updates.important !== undefined)
      body.important = Boolean(updates.important);

    return await apiFetch(`${API_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error('Fel vid uppdatering av uppgift:', err);
    throw err;
  }
}

export async function deleteTask(id) {
  try {
    await apiFetch(`${API_URL}/${id}`, { method: 'DELETE' });
    return true;
  } catch (err) {
    console.error('Fel vid borttagning av uppgift:', err);
    throw err;
  }
}
