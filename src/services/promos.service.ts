import { prisma } from '../lib/db.js';
import type { Promo } from '@prisma/client';
import type { PromoInput } from '../types/dtos.js';

export async function listPromos(): Promise<Promo[]> {
  return prisma.promo.findMany({ orderBy: { periodFrom: 'desc' } });
}

export async function createPromo(data: PromoInput): Promise<Promo> {
  return prisma.promo.create({ data });
}

export async function updatePromo(id: number, data: PromoInput): Promise<Promo> {
  return prisma.promo.update({ where: { id }, data });
}

export async function deletePromo(id: number): Promise<Promo> {
  return prisma.promo.delete({ where: { id } });
}