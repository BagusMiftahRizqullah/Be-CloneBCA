export function notFoundHandler(req, res, next) {
    res.status(404).json({ error: 'Not Found' });
}
import { logger } from '../logger.js';
export function errorHandler(err, req, res, next) {
    logger.error(err.stack || err.message || err);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
}
