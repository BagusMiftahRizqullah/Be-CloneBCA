import { prisma } from '../lib/db.js';

export async function listSlides() {
  return prisma.carouselSlide.findMany({ orderBy: { order: 'asc' } });
}

export async function createSlide(data) {
  return prisma.carouselSlide.create({ data });
}

export async function updateSlide(id, data) {
  return prisma.carouselSlide.update({ where: { id }, data });
}

export async function deleteSlide(id) {
  return prisma.carouselSlide.delete({ where: { id } });
}