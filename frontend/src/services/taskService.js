const API_URL = 'http://localhost:3000/api/task';

export async function getTasks(userId) {
  try {
    const res = await fetch(`${API_URL}/${userId}`);
    if (!res.ok) throw new Error('Misslyckades att hämta uppgifter');
    return res.json();
  } catch (err) {
    console.error('Fel vid hämtning av uppgifter:', err);
    throw err;
  }
}

export async function addTask(task) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error('Misslyckades att skapa uppgift');
    return res.json();
  } catch (err) {
    console.error('Fel vid skapande av uppgift:', err);
    throw err;
  }
}

export async function updateTask(id, updates) {
  try {
    const body = {};
    if (updates.completed !== undefined) body.completed = Boolean(updates.completed);
    if (updates.important !== undefined) body.important = Boolean(updates.important);

    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    
    if (!res.ok) throw new Error('Misslyckades att uppdatera uppgift');
    return res.json();
  } catch (err) {
    console.error('Fel vid uppdatering av uppgift:', err);
    throw err;
  }
}

export async function deleteTask(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Misslyckades att ta bort uppgift');
    return true;
  } catch (err) {
    console.error('Fel vid borttagning av uppgift:', err);
    throw err;
  }
}
