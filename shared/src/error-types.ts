export interface ApiError {
    success: false;
    message: string;
    errors?: Array<{
        field?: string;
        message: string;
        code?: string;
    }>;
}

export interface ApiSuccess<T = any> {
    success: true;
    message: string;
    data?: T;
}

export type ApiResponse<T = any> = ApiSuccess<T> | ApiError;

export class CartError extends Error {
    constructor(
        message: string,
        public code: string = 'CART_ERROR',
        public statusCode: number = 400
    ) {
        super(message);
        this.name = 'CartError';
    }
}

export class ValidationError extends CartError {
    constructor(message: string, public field?: string) {
        super(message, 'VALIDATION_ERROR', 400);
        this.name = 'ValidationError';
    }
}

export class NotFoundError extends CartError {
    constructor(resource: string) {
        super(`${resource} not found`, 'NOT_FOUND', 404);
        this.name = 'NotFoundError';
    }
}