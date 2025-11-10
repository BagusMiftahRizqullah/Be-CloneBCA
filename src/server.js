import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:4200';

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(morgan('dev'));
// Swagger Docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { swaggerOptions: { persistAuthorization: true } }));
app.get('/api/docs.json', (req, res) => res.json(swaggerSpec));

// Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', now: new Date().toISOString() });
});

// Footer: Contact Info
app.get('/api/footer/contact', async (req, res) => {
  try {
    const info = await prisma.contactInfo.findFirst();
    const methods = await prisma.contactMethod.findMany({ orderBy: { id: 'asc' } });
    res.json({ info, methods });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch contact info' });
  }
});

// Footer: Quick Links
app.get('/api/footer/quicklinks', async (req, res) => {
  try {
    const links = await prisma.quickLink.findMany({ orderBy: { order: 'asc' } });
    res.json(links);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch quick links' });
  }
});

// Footer: Social Links
app.get('/api/footer/social', async (req, res) => {
  try {
    const links = await prisma.socialLink.findMany({ orderBy: { order: 'asc' } });
    res.json(links);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch social links' });
  }
});

// Footer: Policy Links
app.get('/api/footer/policy', async (req, res) => {
  try {
    const links = await prisma.policyLink.findMany({ orderBy: { order: 'asc' } });
    res.json(links);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch policy links' });
  }
});

// News
app.get('/api/news', async (req, res) => {
  try {
    const { featured, limit } = req.query;
    const where = featured ? { featured: featured === 'true' } : undefined;
    const take = limit ? Number(limit) : undefined;
    const items = await prisma.news.findMany({ where, take, orderBy: { date: 'desc' } });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`API server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api/docs`);
});