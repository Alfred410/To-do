import { apiFetch } from './apiClient.js';
const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/user`;

//LOGIN
export async function login(email, password) {
  try {
    const data = await apiFetch(`${API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (!data || !data.token) {
      throw new Error(data?.message || 'Login misslyckades');
    }

    localStorage.setItem('token', data.token);
    // localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (err) {
    console.error('Serverfel', err);
    throw err;
  }
}

//REGISTER
export async function register(firstName, lastName, email, password) {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Registering misslyckades');
    }
    return data;
  } catch (err) {
    console.error('Serverfel vid registrering', err);
    throw err;
  }
}

//ACCOUNT INFORMATION
export async function getProfile() {
  try {
    const token = localStorage.getItem('token');

    const res = await fetch(`${API_URL}/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Kunde inte hämta profil');
    }
    return data;
  } catch (err) {
    console.error('Fel vid hämtning av profil', err);
    throw err;
  }
}

//CHANGE PASSWORD
export async function changePassword(currentPassword, newPassword) {
  try {
    const token = localStorage.getItem('token');

    const res = await fetch(`${API_URL}/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Kunde inte ändra lösenord');
    }
    return data;
  } catch (err) {
    console.error('Serverfel', err);
    throw err;
  }
}

//CHANGE NAME
export async function changeName(firstName, lastName) {
  try {
    const token = localStorage.getItem('token');

    const res = await fetch(`${API_URL}/name`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ firstName, lastName }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Kunde inte uppdatera namn');
    }

    return data;
  } catch (err) {
    console.error('Fel vid uppdatering av namn', err);
    throw err;
  }
}

//DELETE ACCOUNT
export async function deleteAccount() {
  try {
    const token = localStorage.getItem('token');

    const res = await fetch(`${API_URL}/delete`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Kunde inte ta bort konto');
    }

    localStorage.removeItem('token');
    // localStorage.removeItem('user');

    return data;
  } catch (err) {
    console.error('Fel vid borttagning av konto', err);
    throw err;
  }
}
