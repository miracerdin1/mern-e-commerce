import { Request, Response, NextFunction } from 'express';
import { CART_VALIDATION } from 'shared/src/cart-types';
import { body, param, validationResult } from 'express-validator';

export const validateAddToCart = [
    body('userId').isMongoId().withMessage('Valid user ID is required'),
    body('productId').isMongoId().withMessage('Valid product ID is required'),
    body('quantity').isInt({
        min: CART_VALIDATION.MIN_QUANTITY,
        max: CART_VALIDATION.MAX_QUANTITY
    }).withMessage(`Quantity must be between ${CART_VALIDATION.MIN_QUANTITY} and ${CART_VALIDATION.MAX_QUANTITY}`),
    handleValidationErrors
];

export const validateUpdateCart = [
    body('userId').isMongoId().withMessage('Valid user ID is required'),
    body('productId').isMongoId().withMessage('Valid product ID is required'),
    body('quantity').isInt({
        min: CART_VALIDATION.MIN_QUANTITY,
        max: CART_VALIDATION.MAX_QUANTITY
    }).withMessage(`Quantity must be between ${CART_VALIDATION.MIN_QUANTITY} and ${CART_VALIDATION.MAX_QUANTITY}`),
    handleValidationErrors
];

export const validateCartParams = [
    param('userId').isMongoId().withMessage('Valid user ID is required'),
    param('productId').optional().isMongoId().withMessage('Valid product ID is required'),
    handleValidationErrors
];

function handleValidationErrors(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
}