import { PrismaClient } from '@prisma/client';

// Shared Prisma client instance for services
export const prisma = new PrismaClient();