import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';
import helmet from 'helmet';
import { logger, morganStream } from './logger.js';
import bcrypt from 'bcryptjs';
import { signToken, authRequired, adminRequired } from './middlewares/auth.js';
import { notFoundHandler, errorHandler } from './middlewares/error.js';
import {
  validate,
  authRegisterValidator,
  authLoginValidator,
  newsCreateValidator,
  promoCreateValidator,
  carouselCreateValidator,
  rateCreateValidator,
  newsQueryValidator,
} from './validators/index.js';

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3002;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:4200';

app.use(cors({ origin: CORS_ORIGIN }));
app.use(helmet());
app.use(express.json());
app.use(morgan('combined', { stream: morganStream }));
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
    logger.error(err);
    res.status(500).json({ error: 'Failed to fetch contact info' });
  }
});

// Footer: Quick Links
app.get('/api/footer/quicklinks', async (req, res) => {
  try {
    const links = await prisma.quickLink.findMany({ orderBy: { order: 'asc' } });
    res.json(links);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to fetch quick links' });
  }
});

// Footer: Social Links
app.get('/api/footer/social', async (req, res) => {
  try {
    const links = await prisma.socialLink.findMany({ orderBy: { order: 'asc' } });
    res.json(links);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to fetch social links' });
  }
});

// Footer: Policy Links
app.get('/api/footer/policy', async (req, res) => {
  try {
    const links = await prisma.policyLink.findMany({ orderBy: { order: 'asc' } });
    res.json(links);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to fetch policy links' });
  }
});

// News
app.get('/api/news', validate(newsQueryValidator), async (req, res) => {
  try {
    const { featured, limit } = req.query;
    const where = featured ? { featured: featured === 'true' } : undefined;
    const take = limit ? Number(limit) : undefined;
    const items = await prisma.news.findMany({ where, take, orderBy: { date: 'desc' } });
    res.json(items);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Auth
app.post('/api/auth/register', validate(authRegisterValidator), async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ error: 'Email already registered' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, name, passwordHash, role: 'user' } });
    const token = signToken({ sub: user.id, email: user.email, role: user.role });
    res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to register' });
  }
});

app.post('/api/auth/login', validate(authLoginValidator), async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = signToken({ sub: user.id, email: user.email, role: user.role });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to login' });
  }
});

app.get('/api/auth/me', authRequired, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.sub } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to load user' });
  }
});

// Promos
app.get('/api/promos', async (req, res) => {
  try {
    const promos = await prisma.promo.findMany({ orderBy: { periodFrom: 'desc' } });
    res.json(promos);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to fetch promos' });
  }
});

app.post('/api/promos', authRequired, adminRequired, validate(promoCreateValidator), async (req, res) => {
  try {
    const promo = await prisma.promo.create({ data: req.body });
    res.status(201).json(promo);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to create promo' });
  }
});

app.put('/api/promos/:id', authRequired, adminRequired, validate(promoCreateValidator), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const promo = await prisma.promo.update({ where: { id }, data: req.body });
    res.json(promo);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to update promo' });
  }
});

app.delete('/api/promos/:id', authRequired, adminRequired, async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.promo.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to delete promo' });
  }
});

// Carousel
app.get('/api/carousel', async (req, res) => {
  try {
    const slides = await prisma.carouselSlide.findMany({ orderBy: { order: 'asc' } });
    res.json(slides);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to fetch carousel' });
  }
});

app.post('/api/carousel', authRequired, adminRequired, validate(carouselCreateValidator), async (req, res) => {
  try {
    const slide = await prisma.carouselSlide.create({ data: req.body });
    res.status(201).json(slide);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to create slide' });
  }
});

app.put('/api/carousel/:id', authRequired, adminRequired, validate(carouselCreateValidator), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const slide = await prisma.carouselSlide.update({ where: { id }, data: req.body });
    res.json(slide);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to update slide' });
  }
});

app.delete('/api/carousel/:id', authRequired, adminRequired, async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.carouselSlide.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to delete slide' });
  }
});

// Currency rates
app.get('/api/rates', async (req, res) => {
  try {
    const rates = await prisma.currencyRate.findMany({ orderBy: { code: 'asc' } });
    res.json(rates);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to fetch rates' });
  }
});

app.post('/api/rates', authRequired, adminRequired, validate(rateCreateValidator), async (req, res) => {
  try {
    const rate = await prisma.currencyRate.create({ data: req.body });
    res.status(201).json(rate);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to create rate' });
  }
});

app.put('/api/rates/:id', authRequired, adminRequired, validate(rateCreateValidator), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const rate = await prisma.currencyRate.update({ where: { id }, data: req.body });
    res.json(rate);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to update rate' });
  }
});

app.delete('/api/rates/:id', authRequired, adminRequired, async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.currencyRate.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to delete rate' });
  }
});

// Basic search across tables
app.get('/api/search', async (req, res) => {
  try {
    const q = String(req.query.q || '').trim();
    if (!q) return res.json({ news: [], promos: [], links: [] });
    const [news, promos, quickLinks] = await Promise.all([
      prisma.news.findMany({ where: { title: { contains: q } }, take: 5, orderBy: { date: 'desc' } }),
      prisma.promo.findMany({ where: { title: { contains: q } }, take: 5, orderBy: { periodFrom: 'desc' } }),
      prisma.quickLink.findMany({ where: { label: { contains: q } }, take: 10, orderBy: { order: 'asc' } }),
    ]);
    res.json({ news, promos, links: quickLinks });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to search' });
  }
});

app.listen(PORT, () => {
  logger.info(`API server is running on http://localhost:${PORT}`);
  logger.info(`Swagger docs available at http://localhost:${PORT}/api/docs`);
});

// Error handlers at the end
app.use(notFoundHandler);
app.use(errorHandler);