import { prisma } from '../lib/db.js';
import type { CurrencyRate } from '@prisma/client';
import type { CurrencyRateInput } from '../types/dtos.js';

export async function listRates(): Promise<CurrencyRate[]> {
  return prisma.currencyRate.findMany({ orderBy: { code: 'asc' } });
}

export async function createRate(data: CurrencyRateInput): Promise<CurrencyRate> {
  return prisma.currencyRate.create({ data });
}

export async function updateRate(id: number, data: CurrencyRateInput): Promise<CurrencyRate> {
  return prisma.currencyRate.update({ where: { id }, data });
}

export async function deleteRate(id: number): Promise<CurrencyRate> {
  return prisma.currencyRate.delete({ where: { id } });
}