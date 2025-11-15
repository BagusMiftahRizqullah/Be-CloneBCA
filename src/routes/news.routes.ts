import express from 'express';
import { getNews } from '../controllers/news.controller.js';
import { validate, newsQueryValidator } from '../validators/index.js';

const router = express.Router();

router.get('/', validate(newsQueryValidator), getNews);

export default router;
