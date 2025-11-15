import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// Prisma client is used via services (src/lib/db.js)
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';
import helmet from 'helmet';
import { logger, morganStream } from './logger.js';
import { notFoundHandler, errorHandler } from './middlewares/error.js';
// Routers
import footerRouter from './routes/footer.routes.js';
import newsRouter from './routes/news.routes.js';
import authRouter from './routes/auth.routes.js';
import promosRouter from './routes/promos.routes.js';
import carouselRouter from './routes/carousel.routes.js';
import ratesRouter from './routes/rates.routes.js';
import searchRouter from './routes/search.routes.js';
const app = express();
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
// Footer routes
app.use('/api/footer', footerRouter);
// News routes
app.use('/api/news', newsRouter);
// Auth routes
app.use('/api/auth', authRouter);
// Promos routes
app.use('/api/promos', promosRouter);
// Carousel routes
app.use('/api/carousel', carouselRouter);
// Rates routes
app.use('/api/rates', ratesRouter);
// Search routes
app.use('/api/search', searchRouter);
app.listen(PORT, () => {
    logger.info(`API server is running on http://localhost:${PORT}`);
    logger.info(`Swagger docs available at http://localhost:${PORT}/api/docs`);
});
// Error handlers at the end
app.use(notFoundHandler);
app.use(errorHandler);
