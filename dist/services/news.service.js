import { prisma } from '../lib/db.js';
export async function listNews({ featured, limit }) {
    const where = typeof featured === 'boolean' ? { featured } : undefined;
    const take = typeof limit === 'number' ? limit : undefined;
    return prisma.news.findMany({ where, take, orderBy: { date: 'desc' } });
}
