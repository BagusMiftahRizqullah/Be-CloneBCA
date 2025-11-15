import { prisma } from '../lib/db.js';
import type { CarouselSlide } from '@prisma/client';
import type { CarouselSlideInput } from '../types/dtos.js';

export async function listSlides(): Promise<CarouselSlide[]> {
  return prisma.carouselSlide.findMany({ orderBy: { order: 'asc' } });
}

export async function createSlide(data: CarouselSlideInput): Promise<CarouselSlide> {
  const payload = {
    title: data.title ?? undefined,
    imageUrl: data.imageUrl,
    href: data.href ?? undefined,
    order: data.order ?? undefined,
  };
  return prisma.carouselSlide.create({ data: payload });
}

export async function updateSlide(id: number, data: CarouselSlideInput): Promise<CarouselSlide> {
  const payload = {
    title: data.title ?? undefined,
    imageUrl: data.imageUrl ?? undefined,
    href: data.href ?? undefined,
    order: data.order ?? undefined,
  };
  return prisma.carouselSlide.update({ where: { id }, data: payload });
}

export async function deleteSlide(id: number): Promise<CarouselSlide> {
  return prisma.carouselSlide.delete({ where: { id } });
}