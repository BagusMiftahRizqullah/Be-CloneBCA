import { prisma } from '../lib/db.js';
export async function listSlides() {
    return prisma.carouselSlide.findMany({ orderBy: { order: 'asc' } });
}
export async function createSlide(data) {
    const payload = {
        title: data.title ?? undefined,
        imageUrl: data.imageUrl,
        href: data.href ?? undefined,
        order: data.order ?? undefined,
    };
    return prisma.carouselSlide.create({ data: payload });
}
export async function updateSlide(id, data) {
    const payload = {
        title: data.title ?? undefined,
        imageUrl: data.imageUrl ?? undefined,
        href: data.href ?? undefined,
        order: data.order ?? undefined,
    };
    return prisma.carouselSlide.update({ where: { id }, data: payload });
}
export async function deleteSlide(id) {
    return prisma.carouselSlide.delete({ where: { id } });
}
