import { prisma } from '../lib/db.js';
import type { News, Promo, QuickLink } from '@prisma/client';

export async function searchAll(q: string): Promise<{ news: News[]; promos: Promo[]; links: QuickLink[] }> {
  const [news, promos, quickLinks] = await Promise.all([
    prisma.news.findMany({ where: { title: { contains: q } }, take: 5, orderBy: { date: 'desc' } }),
    prisma.promo.findMany({ where: { title: { contains: q } }, take: 5, orderBy: { periodFrom: 'desc' } }),
    prisma.quickLink.findMany({ where: { label: { contains: q } }, take: 10, orderBy: { order: 'asc' } }),
  ]);
  return { news, promos, links: quickLinks };
}