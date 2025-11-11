import { logger } from '../logger.js';
import { registerUser, loginUser, getUserById } from '../services/auth.service.js';
import { signToken } from '../middlewares/auth.js';

export async function register(req, res) {
  try {
    const { email, password, name } = req.body;
    const user = await registerUser({ email, password, name });
    if (user?.conflict) return res.status(409).json({ error: 'Email already registered' });
    const token = signToken({ sub: user.id, email: user.email, role: user.role });
    res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to register' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await loginUser({ email, password });
    if (user?.invalid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = signToken({ sub: user.id, email: user.email, role: user.role });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to login' });
  }
}

export async function me(req, res) {
  try {
    const user = await getUserById(req.user.sub);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to load user' });
  }
}