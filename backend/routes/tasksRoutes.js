import express from 'express';
import db from '../db.js';
import { authenticateToken} from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC`,
      [req.userId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte hämta uppgifter' });
  }
});

router.post('/', authenticateToken,async (req, res) => {
  try {
    const { title, task_category_id } = req.body;
    const { rows } = await db.query(
      `INSERT INTO tasks (user_id, title, task_category_id)
            VALUES ($1, $2, $3)
            RETURNING *`,
      [req.userId, title, task_category_id || null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte skapa uppgift' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { important, completed } = req.body;

    if (important === undefined && completed === undefined) {
      return res
        .status(400)
        .json({ error: 'Ingen data skickades för uppdatering' });
    }

    const { rows } = await db.query(
      `UPDATE tasks SET important = COALESCE($1, important), completed = COALESCE($2, completed) WHERE id = $3 AND user_id = $4 RETURNING *`,
      [
        important !== undefined ? Boolean(important) : undefined,
        completed !== undefined ? Boolean(completed) : undefined,
        id, req.userId
      ]
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: `Ingen uppgift hittades med id ${id}` });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte uppdatera uppgift' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM tasks WHERE id = $1 AND user_id=$2', [id, req.userId]);
    
    res.json({message: 'Uppgift borttagen'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte radera uppgift' });
  }
});

export default router;
