import winston from 'winston';
const { combine, timestamp, printf, colorize } = winston.format;
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
});
/**
 * Application logger based on winston.
 */
export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(timestamp(), logFormat),
    transports: [
        new winston.transports.Console({
            level: process.env.LOG_LEVEL || 'info',
            format: combine(colorize(), timestamp(), logFormat),
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    ],
});
// Morgan stream for HTTP logging
export const morganStream = {
    write: (message) => logger.info(message.trim()),
};
