import { logger } from '../logger.js';
import { listNews } from '../services/news.service.js';

export async function getNews(req, res) {
  try {
    const { featured, limit } = req.query;
    const items = await listNews({
      featured: featured ? featured === 'true' : undefined,
      limit: limit ? Number(limit) : undefined,
    });
    res.json(items);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}