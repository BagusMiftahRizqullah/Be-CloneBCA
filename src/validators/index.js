import { body, param, query } from 'express-validator';

export const validate = (validations) => {
  return async (req, res, next) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }
    const { validationResult } = await import('express-validator');
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({ error: 'Validation failed', details: errors.array() });
  };
};

export const authRegisterValidator = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password min length 6'),
  body('name').isString().notEmpty().withMessage('Name required'),
];

export const authLoginValidator = [
  body('email').isEmail(),
  body('password').isString().notEmpty(),
];

export const newsCreateValidator = [
  body('title').isString().notEmpty(),
  body('date').isISO8601().toDate(),
  body('category').isString().notEmpty(),
  body('imageUrl').optional().isString(),
  body('url').optional().isString(),
  body('featured').optional().isBoolean(),
];

export const promoCreateValidator = [
  body('title').isString().notEmpty(),
  body('imageUrl').isString().notEmpty(),
  body('periodFrom').isISO8601().toDate(),
  body('periodTo').isISO8601().toDate(),
  body('url').optional().isString(),
  body('featured').optional().isBoolean(),
];

export const carouselCreateValidator = [
  body('title').optional().isString(),
  body('imageUrl').isString().notEmpty(),
  body('href').optional().isString(),
  body('order').optional().isInt(),
];

export const rateCreateValidator = [
  body('code').isString().notEmpty(),
  body('buy').isFloat(),
  body('sell').isFloat(),
  body('flagSrc').optional().isString(),
];

export const newsQueryValidator = [
  query('featured').optional().isBoolean(),
  query('limit').optional().isInt({ min: 1, max: 50 }),
];