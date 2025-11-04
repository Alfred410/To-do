import express from 'express';
import pgClient from '../db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

//Login POST
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email och lösenord krävs' });
  }

  try {
    const result = await pgClient.query(
      'SELECT id, first_name, last_name, email, password FROM users WHERE email=$1',
      [email]
    );

    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ message: 'Fel användarnamn eller lösenord' });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Fel email eller lösenord' });
    }

    res.json({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

//Register POST
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Alla fält krävs' });
  }
  try {
    const exists = await pgClient.query('SELECT id FROM users WHERE email=$1', [
      email,
    ]);

    if (exists.rows.length > 0) {
      return res.status(400).json({ message: 'Användaren finns redan' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await pgClient.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email, created_at',
      [firstName, lastName, email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Account information GET
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: 'userId saknas' });

  try {
    const result = await pgClient.query(
      'SELECT id, first_name, last_name, email, created_at FROM users WHERE id=$1',
      [id]
    );

    if (result.rows.length === 0)
      return res.status(400).json({ message: 'Användaren hittades inte' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

//Change Password PUT
router.put('/password', async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;

  if (!userId || !oldPassword || !newPassword)
    return res.status(400).json({ message: 'Alla fält krävs' });

  try {
    //kolla gammalt lösen
    const userResult = await pgClient.query(
      'SELECT id, password FROM users WHERE id=$1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Användaren hittades inte' });
    }

    const user = userResult.rows[0];

    //Jämför lösen
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match)
      return res.status(400).json({ message: 'Fel gammalt lösenord' });

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await pgClient.query('UPDATE users SET password=$1 WHERE id=$2', [
      hashedPassword,
      userId,
    ]);

    res.json({ message: 'Lösenord uppdaterat' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

//Change Name PUT
router.put('/name', async (req, res) => {
  const { userId, firstName, lastName } = req.body;

  if (!userId || !firstName || !lastName) {
    return res.status(400).json({ message: 'Alla fält krävs' });
  }

  try {
    const userResult = await pgClient.query(
      'SELECT id FROM users WHERE id=$1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Användaren hittades inte' });
    }

    await pgClient.query(
      'UPDATE users SET first_name=$1, last_name=$2 WHERE id=$3',
      [firstName, lastName, userId]
    );

    res.json({ message: 'Namn upddaterat' });
  } catch (err) {
    console.error('Fel i name route', err);
    res.status(500).json({ message: 'Server error' });
  }
});

//Delete Account DELETE
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
