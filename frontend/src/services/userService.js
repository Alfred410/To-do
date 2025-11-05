const API_URL = `http://localhost:3000/api/user`;

export async function login(email, password) {
  try {
    const res = await fetch('http://localhost:3000/api/user/login', {
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
