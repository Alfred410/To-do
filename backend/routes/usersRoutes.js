import express from 'express';
import pgClient from '../db.js';

const router = express.Router();

//Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pgClient.query(
      'SELECT id, username, email FROM users WHERE username=$1 AND password=$2',
      [username, password]
    );
    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ message: 'Fel användarnamn eller lösenord' });
    }
    const user = result.rows[0];
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

//Register
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const exists = await pgClient.query('SELECT id FROM users WHERE email=$1', [
      email,
    ]);

    if (exists.rows.length > 0) {
      return res.status(400).json({ message: 'Användaren finns redan' });
    }

    const result = await pgClient.query(
      'INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING id, firstName, lastName, email',
      [firstName, lastName, password]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Account information
router.get('/me', async (req, res) => {
  const { userId } = req.query;

  try {
    const result = await pgClient.query(
      'SELECT id, firstName, lastName, email, created_at, FROM users WHERE id=$1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Användaren hittades inte' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

//Change Password
router.put('/password', async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;

  try {
    //kolla gammalt lösen
    const check = await pgClient.query(
      'SELECT id FROM users WHERE id=$1 AND password=$2',
      [userId, oldPassword]
    );

    if (check.rows.length === 0) {
      return res.status(400).json({ message: 'Fel gammalt lösenord' });
    }

    await pgClient.query(
      'UPDATE users SET password=$1, updated_at=NOW() WHERE id=$2',
      [newPassword, userId]
    );

    res.json({ message: 'Lösenord uppdaterat' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

//Change Name

//Delete Account
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pgClient.query('DELETE FROM users WHERE id=$1', [id]);
    res.json({ message: 'Kontot borttaget' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
