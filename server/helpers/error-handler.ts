import { Response } from 'express';
import { CartError, NotFoundError, ValidationError } from 'shared/src/error-types';

export interface ErrorResponse {
    success: false;
    message: string;
    code?: string;
    errors?: Array<{
        field?: string;
        message: string;
        code?: string;
    }>;
}

export const handleError = (error: any, res: Response, defaultMessage: string): void => {
    console.error('Operation error:', error);

    if (error instanceof ValidationError) {
        res.status(400).json({
            success: false,
            message: error.message,
            code: error.code,
            errors: error.field ? [{ field: error.field, message: error.message }] : undefined
        });
        return;
    }

    if (error instanceof NotFoundError) {
        res.status(404).json({
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

    // Generic error
    res.status(500).json({
        success: false,
        message: defaultMessage,
        code: 'INTERNAL_ERROR'
    });
};