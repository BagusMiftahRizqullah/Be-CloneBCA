import pkg from '@prisma/client';
const { PrismaClient } = pkg as unknown as { PrismaClient: new () => any };

/**
 * Shared Prisma client instance used across service layer.
 * Ensures a single connection pool is reused.
 */
export const prisma = new PrismaClient();
