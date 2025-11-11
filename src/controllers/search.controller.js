import { logger } from '../logger.js';
import { searchAll } from '../services/search.service.js';

export async function search(req, res) {
  try {
    const q = String(req.query.q || '').trim();
    if (!q) return res.json({ news: [], promos: [], links: [] });
    const result = await searchAll(q);
    res.json(result);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to search' });
  }
}