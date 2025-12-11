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
app.set('trust proxy', 1);

const rawOrigins = process.env.CORS_ORIGIN || 'http://localhost:4200,http://localhost:3000,http://144.202.24.24:3000';
const allowAll = rawOrigins.trim() === '*';
const allowedOrigins = rawOrigins.split(',').map((o) => o.trim()).filter(Boolean);
app.use(
  cors({
    origin: allowAll
      ? true
      : (origin, callback) => {
          if (!origin) return callback(null, true);
          if (allowedOrigins.includes(origin)) return callback(null, true);
          return callback(new Error('Not allowed by CORS'));
        },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(helmet());
app.use(express.json());
app.use(morgan('combined', { stream: morganStream }));
 
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { swaggerOptions: { persistAuthorization: true, url: '/api/docs.json' } }));
app.get('/api/docs.json', (req, res) => {
  const proto = (req.headers['x-forwarded-proto'] as string) || req.protocol;
  const host = req.get('host');
  const serverUrl = `${proto}://${host}`;
  res.json({ ...swaggerSpec, servers: [{ url: serverUrl }] });
});

 
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
