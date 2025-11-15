import type { Request, Response, NextFunction } from 'express';

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ error: 'Not Found' });
}

import { logger } from '../logger.js';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(err.stack || err.message || err);
  const status: number = err.status || 500;
  const message: string = err.message || 'Internal Server Error';
  res.status(status).json({ error: message });
}