import { prisma } from '../lib/db.js';

export async function listPromos() {
  return prisma.promo.findMany({ orderBy: { periodFrom: 'desc' } });
}

export async function createPromo(data) {
  return prisma.promo.create({ data });
}

export async function updatePromo(id, data) {
  return prisma.promo.update({ where: { id }, data });
}

export async function deletePromo(id) {
  return prisma.promo.delete({ where: { id } });
}