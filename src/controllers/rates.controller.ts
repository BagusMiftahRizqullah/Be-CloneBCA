import { logger } from '../logger.js';
import { listRates, createRate, updateRate, deleteRate } from '../services/rates.service.js';
import type { Request, Response } from 'express';
import type { CurrencyRateInput } from '../types/dtos.js';

export async function getRates(req: Request, res: Response) {
  try {
    const rates = await listRates();
    res.json(rates);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to fetch rates' });
  }
}

export async function postRate(req: Request, res: Response) {
  try {
    const rate = await createRate(req.body as CurrencyRateInput);
    res.status(201).json(rate);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to create rate' });
  }
}

export async function putRate(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const rate = await updateRate(id, req.body as CurrencyRateInput);
    res.json(rate);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to update rate' });
  }
}

export async function removeRate(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    await deleteRate(id);
    res.status(204).send();
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to delete rate' });
  }
}