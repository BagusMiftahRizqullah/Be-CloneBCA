import { logger } from '../logger.js';
import { listSlides, createSlide, updateSlide, deleteSlide } from '../services/carousel.service.js';
export async function getCarousel(req, res) {
    try {
        const slides = await listSlides();
        res.json(slides);
    }
    catch (err) {
        logger.error(err);
        res.status(500).json({ error: 'Failed to fetch carousel' });
    }
}
export async function postCarousel(req, res) {
    try {
        const slide = await createSlide(req.body);
        res.status(201).json(slide);
    }
    catch (err) {
        logger.error(err);
        res.status(500).json({ error: 'Failed to create slide' });
    }
}
export async function putCarousel(req, res) {
    try {
        const id = Number(req.params.id);
        const slide = await updateSlide(id, req.body);
        res.json(slide);
    }
    catch (err) {
        logger.error(err);
        res.status(500).json({ error: 'Failed to update slide' });
    }
}
export async function removeCarousel(req, res) {
    try {
        const id = Number(req.params.id);
        await deleteSlide(id);
        res.status(204).send();
    }
    catch (err) {
        logger.error(err);
        res.status(500).json({ error: 'Failed to delete slide' });
    }
}
