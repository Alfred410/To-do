import { apiFetch } from './apiClient.js';
const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/task`;

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

export async function updateTaskImportant(id, important) {
  try {
    return await apiFetch(`${API_URL}/${id}/important`, {
      method: 'PUT',
      body: JSON.stringify({ important: Boolean(important) }),
    });
  } catch (err) {
    console.error('Fel vid uppdatering av stjärnmärkning:', err);
    throw err;
  }
}

export async function updateTaskCompleted(id, completed) {
  try {
    return await apiFetch(`${API_URL}/${id}/completed`, {
      method: 'PUT',
      body: JSON.stringify({ completed: Boolean(completed) }),
    });
  } catch (err) {
    console.error('Fel vid uppdatering av checkbox:', err);
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
