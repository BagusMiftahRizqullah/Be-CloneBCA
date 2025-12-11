import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';
import helmet from 'helmet';
import { morganStream } from './logger.js';
import { notFoundHandler, errorHandler } from './middlewares/error.js';
import footerRouter from './routes/footer.routes.js';
import newsRouter from './routes/news.routes.js';
import authRouter from './routes/auth.routes.js';
import promosRouter from './routes/promos.routes.js';
import carouselRouter from './routes/carousel.routes.js';
import ratesRouter from './routes/rates.routes.js';
import searchRouter from './routes/search.routes.js';

export const app = express();

const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:4200';

app.use(cors({ origin: CORS_ORIGIN }));
app.use(helmet());
app.use(express.json());
app.use(morgan('combined', { stream: morganStream }));
 
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { swaggerOptions: { persistAuthorization: true } }));
app.get('/api/docs.json', (req, res) => res.json(swaggerSpec));

 
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', now: new Date().toISOString() });
});

 
app.use('/api/footer', footerRouter);

 
app.use('/api/news', newsRouter);

 
app.use('/api/auth', authRouter);

 
app.use('/api/promos', promosRouter);

 
app.use('/api/carousel', carouselRouter);

 
app.use('/api/rates', ratesRouter);

 
app.use('/api/search', searchRouter);

 
app.use(notFoundHandler);
app.use(errorHandler);
