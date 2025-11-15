import { prisma } from '../lib/db.js';
export async function listRates() {
    return prisma.currencyRate.findMany({ orderBy: { code: 'asc' } });
}
export async function createRate(data) {
    return prisma.currencyRate.create({ data });
}
export async function updateRate(id, data) {
    return prisma.currencyRate.update({ where: { id }, data });
}
export async function deleteRate(id) {
    return prisma.currencyRate.delete({ where: { id } });
}
