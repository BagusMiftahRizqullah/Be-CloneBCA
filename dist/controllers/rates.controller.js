import { logger } from '../logger.js';
import { listRates, createRate, updateRate, deleteRate } from '../services/rates.service.js';
export async function getRates(req, res) {
    try {
        const rates = await listRates();
        res.json(rates);
    }
    catch (err) {
        logger.error(err);
        res.status(500).json({ error: 'Failed to fetch rates' });
    }
}
export async function postRate(req, res) {
    try {
        const rate = await createRate(req.body);
        res.status(201).json(rate);
    }
    catch (err) {
        logger.error(err);
        res.status(500).json({ error: 'Failed to create rate' });
    }
}
export async function putRate(req, res) {
    try {
        const id = Number(req.params.id);
        const rate = await updateRate(id, req.body);
        res.json(rate);
    }
    catch (err) {
        logger.error(err);
        res.status(500).json({ error: 'Failed to update rate' });
    }
}
export async function removeRate(req, res) {
    try {
        const id = Number(req.params.id);
        await deleteRate(id);
        res.status(204).send();
    }
    catch (err) {
        logger.error(err);
        res.status(500).json({ error: 'Failed to delete rate' });
    }
}
