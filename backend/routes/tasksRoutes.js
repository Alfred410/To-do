import express from 'express';
import db from '../db.js';
const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { rows } = await db.query(
      `SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte hämta uppgifter' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { user_id, title, task_category_id } = req.body;
    const { rows } = await db.query(
      `INSERT INTO tasks (user_id, title, task_category_id)
            VALUES ($1, $2, $3)
            RETURNING *`,
      [user_id, title, task_category_id || null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte skapa uppgift' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, task_category_id, important, completed } = req.body;
    const { rows } = await db.query(
      `UPDATE tasks SET title = 1$, task_category_id=2$ important = $3, completed = $4, updated_at = NOW() WHERE id = $5 RETURNING *`,
      [title, task_category_id, important, completed, id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte uppdatera uppgift' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte radera uppgift' });
  }
});

export default router;
