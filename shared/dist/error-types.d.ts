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
export declare class CartError extends Error {
    code: string;
    statusCode: number;
    constructor(message: string, code?: string, statusCode?: number);
}
export declare class ValidationError extends CartError {
    field?: string | undefined;
    constructor(message: string, field?: string | undefined);
}
export declare class NotFoundError extends CartError {
    constructor(resource: string);
}
