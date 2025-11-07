import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Hämta alla kategorier
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM task_categories ORDER BY task_category ASC'
    );
    res.json(rows);
  } catch (err) {
    console.error('Fel vid hämtning av kategorier:', err);
    res.status(500).json({ error: 'Kunde inte hämta kategorier' });
  }
});

export default router;
