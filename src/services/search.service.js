import { prisma } from '../lib/db.js';

export async function searchAll(q) {
  const [news, promos, quickLinks] = await Promise.all([
    prisma.news.findMany({ where: { title: { contains: q } }, take: 5, orderBy: { date: 'desc' } }),
    prisma.promo.findMany({ where: { title: { contains: q } }, take: 5, orderBy: { periodFrom: 'desc' } }),
    prisma.quickLink.findMany({ where: { label: { contains: q } }, take: 10, orderBy: { order: 'asc' } }),
  ]);
  return { news, promos, links: quickLinks };
}