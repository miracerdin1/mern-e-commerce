import { Response } from 'express';
import { CartError, ValidationError, NotFoundError } from 'shared/src/error-types';
import { HTTP_STATUS } from '../constants/http-status';

export const handleError = (error: any, res: Response, defaultMessage: string): void => {
    console.error('Error:', error);

    if (error instanceof ValidationError) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: error.message,
            field: error.field,
            code: error.code
        });
        return;
    }

    if (error instanceof NotFoundError) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            success: false,
            message: error.message,
            code: error.code
        });
        return;
    }

    if (error instanceof CartError) {
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
            code: error.code
        });
        return;
    }

    // Default error response
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: defaultMessage
    });
};