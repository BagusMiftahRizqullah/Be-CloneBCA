import 'dotenv/config';
import { app } from './app.js';
import { logger } from './logger.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3002;
app.listen(PORT, () => {
  logger.info(`API server is running on http://localhost:${PORT}`);
  logger.info(`Swagger docs available at http://localhost:${PORT}/api/docs`);
});
