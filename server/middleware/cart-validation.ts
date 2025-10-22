import {Request, Response, NextFunction} from 'express';
import {CART_VALIDATION} from 'shared/src/cart-types';
import {HTTP_STATUS} from '../constants/http-status';

const isValidMongoId = (id: string): boolean => {
    return /^[0-9a-fA-F]{24}$/.test(id);
};

const isValidQuantity = (quantity: number): boolean => {
    return Number.isInteger(quantity) &&
        quantity >= CART_VALIDATION.MIN_QUANTITY &&
        quantity <= CART_VALIDATION.MAX_QUANTITY;
};

export const validateAddToCart = (req: Request, res: Response, next: NextFunction): void => {
    const {userId, productId, quantity} = req.body;
    const errors: string[] = [];

    if (!userId || !isValidMongoId(userId)) {
        errors.push('Valid user ID is required');
    }

    if (!productId || !isValidMongoId(productId)) {
        errors.push('Valid product ID is required');
    }

    if (!quantity || !isValidQuantity(quantity)) {
        errors.push(`Quantity must be between ${CART_VALIDATION.MIN_QUANTITY} and ${CART_VALIDATION.MAX_QUANTITY}`);
    }

    if (errors.length > 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
        return;
    }

    next();
};

export const validateUpdateCart = (req: Request, res: Response, next: NextFunction): void => {
    const {userId, productId, quantity} = req.body;
    const errors: string[] = [];

    if (!userId || !isValidMongoId(userId)) {
        errors.push('Valid user ID is required');
    }

    if (!productId || !isValidMongoId(productId)) {
        errors.push('Valid product ID is required');
    }

    if (!quantity || !isValidQuantity(quantity)) {
        errors.push(`Quantity must be between ${CART_VALIDATION.MIN_QUANTITY} and ${CART_VALIDATION.MAX_QUANTITY}`);
    }

    if (errors.length > 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
        return;
    }

    next();
};

export const validateCartParams = (req: Request, res: Response, next: NextFunction): void => {
    const {userId, productId} = req.params;
    const errors: string[] = [];

    if (!userId || !isValidMongoId(userId)) {
        errors.push('Valid user ID is required');
    }

    if (productId && !isValidMongoId(productId)) {
        errors.push('Valid product ID is required');
    }

    if (errors.length > 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
        return;
    }

    next();
};