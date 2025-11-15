import { logger } from '../logger.js';
import { registerUser, loginUser, getUserById } from '../services/auth.service.js';
import { signToken } from '../middlewares/auth.js';
import type { Request, Response } from 'express';
import type { RegisterInput, LoginInput } from '../types/dtos.js';
import type { User } from '@prisma/client';

export async function register(req: Request, res: Response) {
  try {
    const { email, password, name } = req.body as RegisterInput;
    const user = await registerUser({ email, password, name });
    if ('conflict' in user) return res.status(409).json({ error: 'Email already registered' });
    const u = user as User;
    const token = signToken({ sub: u.id, email: u.email, role: u.role });
    res.status(201).json({ token, user: { id: u.id, email: u.email, name: u.name, role: u.role } });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to register' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body as LoginInput;
    const user = await loginUser({ email, password });
    if ('invalid' in user) return res.status(401).json({ error: 'Invalid credentials' });
    const u = user as User;
    const token = signToken({ sub: u.id, email: u.email, role: u.role });
    res.json({ token, user: { id: u.id, email: u.email, name: u.name, role: u.role } });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to login' });
  }
}

export async function me(req: Request, res: Response) {
  try {
    const user = await getUserById(req.user!.sub as number);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to load user' });
  }
}