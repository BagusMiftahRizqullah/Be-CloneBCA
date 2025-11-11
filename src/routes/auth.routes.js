import express from 'express';
import { register, login, me } from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/auth.js';
import { validate, authRegisterValidator, authLoginValidator } from '../validators/index.js';

const router = express.Router();

router.post('/register', validate(authRegisterValidator), register);
router.post('/login', validate(authLoginValidator), login);
router.get('/me', authRequired, me);

export default router;