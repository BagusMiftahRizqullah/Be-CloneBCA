import express from 'express';
import { getRates, postRate, putRate, removeRate } from '../controllers/rates.controller.js';
import { authRequired, adminRequired } from '../middlewares/auth.js';
import { validate, rateCreateValidator } from '../validators/index.js';

const router = express.Router();

router.get('/', getRates);
router.post('/', authRequired, adminRequired, validate(rateCreateValidator), postRate);
router.put('/:id', authRequired, adminRequired, validate(rateCreateValidator), putRate);
router.delete('/:id', authRequired, adminRequired, removeRate);

export default router;
