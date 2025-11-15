import { logger } from '../logger.js';
import { listPromos, createPromo, updatePromo, deletePromo } from '../services/promos.service.js';
export async function getPromos(req, res) {
    try {
        const promos = await listPromos();
        res.json(promos);
    }
    catch (err) {
        logger.error(err);
        res.status(500).json({ error: 'Failed to fetch promos' });
    }
}
export async function postPromo(req, res) {
    try {
        const promo = await createPromo(req.body);
        res.status(201).json(promo);
    }
    catch (err) {
        logger.error(err);
        res.status(500).json({ error: 'Failed to create promo' });
    }
}
export async function putPromo(req, res) {
    try {
        const id = Number(req.params.id);
        const promo = await updatePromo(id, req.body);
        res.json(promo);
    }
    catch (err) {
        logger.error(err);
        res.status(500).json({ error: 'Failed to update promo' });
    }
}
export async function removePromo(req, res) {
    try {
        const id = Number(req.params.id);
        await deletePromo(id);
        res.status(204).send();
    }
    catch (err) {
        logger.error(err);
        res.status(500).json({ error: 'Failed to delete promo' });
    }
}
