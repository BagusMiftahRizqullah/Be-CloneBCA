import { prisma } from '../lib/db.js';
import type { News } from '@prisma/client';

export async function listNews({ featured, limit }: { featured?: boolean; limit?: number }): Promise<News[]> {
  const where = typeof featured === 'boolean' ? { featured } : undefined;
  const take = typeof limit === 'number' ? limit : undefined;
  return prisma.news.findMany({ where, take, orderBy: { date: 'desc' } });
}