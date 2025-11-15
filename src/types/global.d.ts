/**
 * Global type augmentations and shared interfaces for bca-backend.
 */
import type { JwtPayload } from 'jsonwebtoken';

export interface JWTUser {
  sub: number;
  email: string;
  role: string; // 'user' | 'admin'
}

declare global {
  namespace Express {
    interface Request {
      user?: JWTUser & JwtPayload;
    }
  }
}

export {};