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
      return;
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
