import { logger } from '../logger.js';
import { listPromos, createPromo, updatePromo, deletePromo } from '../services/promos.service.js';
import type { Request, Response } from 'express';
import type { PromoInput } from '../types/dtos.js';

export async function getPromos(req: Request, res: Response) {
  try {
    const promos = await listPromos();
    res.json(promos);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to fetch promos' });
  }
}

export async function postPromo(req: Request, res: Response) {
  try {
    const promo = await createPromo(req.body as PromoInput);
    res.status(201).json(promo);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to create promo' });
  }
}

export async function putPromo(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const promo = await updatePromo(id, req.body as PromoInput);
    res.json(promo);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to update promo' });
  }
}

export async function removePromo(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    await deletePromo(id);
    res.status(204).send();
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to delete promo' });
  }
}