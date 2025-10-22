import { Response } from 'express';

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}

export class ResponseHelper {
    static success<T>(res: Response, data: T, message: string, statusCode = 200): void {
        res.status(statusCode).json({
            success: true,
            message,
            data
        } as ApiResponse<T>);
    }

    static error(res: Response, message: string, statusCode = 500, error?: string): void {
        res.status(statusCode).json({
            success: false,
            message,
            error
        } as ApiResponse);
    }

    static notFound(res: Response, resource: string): void {
        this.error(res, `${resource} not found`, 404);
    }

    static badRequest(res: Response, message: string): void {
        this.error(res, message, 400);
    }

    static serverError(res: Response, message = 'Internal server error'): void {
        this.error(res, message, 500);
    }
}