const API_URL = `http://localhost:3000/api/user`;

//LOGIN
export async function login(email, password) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error('Login misslyckades', data.message);
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
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
export async function changePassword(userId, currentPassword, newPassword) {
  try {
    const token = localStorage.getItem('token');

    const res = await fetch(`${API_URL}/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, currentPassword, newPassword }),
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
export async function changeName(userId, firstName, lastName) {
  try {
    const token = localStorage.getItem('token');

    const res = await fetch(`${API_URL}/name`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, firstName, lastName }),
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
export async function deleteAccount(userId) {
  try {
    const token = localStorage.getItem('token');

    const res = await fetch(`${API_URL}/${userId}`, {
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
    localStorage.removeItem('user');

    return data;
  } catch (err) {
    console.error('Fel vid borttagning av konto', err);
    throw err;
  }
}
