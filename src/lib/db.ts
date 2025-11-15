import { PrismaClient } from '@prisma/client';

/**
 * Shared Prisma client instance used across service layer.
 * Ensures a single connection pool is reused.
 */
export const prisma = new PrismaClient();