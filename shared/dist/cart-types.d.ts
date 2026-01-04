export interface CartItem {
    productId: string;
    image: string;
    title: string;
    price: number;
    salePrice?: number;
    quantity: number;
}
export interface CartState {
    cartItems: CartItem[];
    isLoading: boolean;
    error: string | null;
    lastUpdated: number | null;
}
export interface CartApiResponse {
    success: boolean;
    message: string;
    data?: {
        items: CartItem[];
    };
}
export interface AddToCartRequest {
    userId: string;
    productId: string;
    quantity: number;
}
export interface UpdateCartRequest extends AddToCartRequest {
}
export interface DeleteCartItemRequest {
    userId: string;
    productId: string;
}
export declare const CART_VALIDATION: {
    readonly MIN_QUANTITY: 1;
    readonly MAX_QUANTITY: 100;
    readonly MAX_TOTAL_QUANTITY: 100;
};
export declare const isValidQuantity: (quantity: number) => boolean;
export declare const isValidProductId: (productId: string) => boolean;
export declare const isValidUserId: (userId: string) => boolean;
