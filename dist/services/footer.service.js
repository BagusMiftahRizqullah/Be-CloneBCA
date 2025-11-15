import { prisma } from '../lib/db.js';
export async function getContact() {
    const info = await prisma.contactInfo.findFirst();
    const methods = await prisma.contactMethod.findMany({ orderBy: { id: 'asc' } });
    return { info, methods };
}
export async function getQuickLinks() {
    return prisma.quickLink.findMany({ orderBy: { order: 'asc' } });
}
export async function getSocialLinks() {
    return prisma.socialLink.findMany({ orderBy: { order: 'asc' } });
}
export async function getPolicyLinks() {
    return prisma.policyLink.findMany({ orderBy: { order: 'asc' } });
}
