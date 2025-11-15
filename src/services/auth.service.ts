import { prisma } from '../lib/db.js';
import bcrypt from 'bcryptjs';
import type { RegisterInput, LoginInput } from '../types/dtos.js';
import type { User } from '@prisma/client';

export async function registerUser({ email, password, name }: RegisterInput): Promise<User | { conflict: true }> {
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return { conflict: true } as const;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, name, passwordHash, role: 'user' } });
  return user;
}

export async function loginUser({ email, password }: LoginInput): Promise<User | { invalid: true }> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { invalid: true } as const;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return { invalid: true } as const;
  return user;
}

export async function getUserById(id: number): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}