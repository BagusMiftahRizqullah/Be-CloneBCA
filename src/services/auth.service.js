import { prisma } from '../lib/db.js';
import bcrypt from 'bcryptjs';

export async function registerUser({ email, password, name }) {
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return { conflict: true };
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, name, passwordHash, role: 'user' } });
  return user;
}

export async function loginUser({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { invalid: true };
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return { invalid: true };
  return user;
}

export async function getUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}