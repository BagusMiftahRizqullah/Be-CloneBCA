import { body, query, ValidationChain, validationResult } from 'express-validator';
import type { Request, Response, NextFunction, RequestHandler } from 'express';

export const validate = (validations: ValidationChain[]): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run all validations and collect any errors via validationResult API
    await Promise.all(validations.map((v) => v.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({ error: 'Validation failed', details: errors.array() });
  };
};

export const authRegisterValidator: ValidationChain[] = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password min length 6'),
  body('name').isString().notEmpty().withMessage('Name required'),
];

export const authLoginValidator: ValidationChain[] = [
  body('email').isEmail(),
  body('password').isString().notEmpty(),
];

export const newsCreateValidator: ValidationChain[] = [
  body('title').isString().notEmpty(),
  body('date').isISO8601().toDate(),
  body('category').isString().notEmpty(),
  body('imageUrl').optional().isString(),
  body('url').optional().isString(),
  body('featured').optional().isBoolean(),
];

export const promoCreateValidator: ValidationChain[] = [
  body('title').isString().notEmpty(),
  body('imageUrl').isString().notEmpty(),
  body('periodFrom').isISO8601().toDate(),
  body('periodTo').isISO8601().toDate(),
  body('url').optional().isString(),
  body('featured').optional().isBoolean(),
];

export const carouselCreateValidator: ValidationChain[] = [
  body('title').optional().isString(),
  body('imageUrl').isString().notEmpty(),
  body('href').optional().isString(),
  body('order').optional().isInt(),
];

export const rateCreateValidator: ValidationChain[] = [
  body('code').isString().notEmpty(),
  body('buy').isFloat(),
  body('sell').isFloat(),
  body('flagSrc').optional().isString(),
];

export const newsQueryValidator: ValidationChain[] = [
  query('featured').optional().isBoolean(),
  query('limit').optional().isInt({ min: 1, max: 50 }),
];