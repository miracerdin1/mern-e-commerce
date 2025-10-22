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

export interface UpdateCartRequest extends AddToCartRequest { }

export interface DeleteCartItemRequest {
    userId: string;
    productId: string;
}

// Validation helpers
// Validation constants
export const CART_VALIDATION = {
    MIN_QUANTITY: 1,
    MAX_QUANTITY: 100,
    MAX_TOTAL_QUANTITY: 100
} as const;

export const isValidQuantity = (quantity: number): boolean => {
    return Number.isInteger(quantity) &&
        quantity >= CART_VALIDATION.MIN_QUANTITY &&
        quantity <= CART_VALIDATION.MAX_QUANTITY;
};

export const isValidProductId = (productId: string): boolean => {
    return typeof productId === 'string' && productId.length > 0;
};

export const isValidUserId = (userId: string): boolean => {
    return typeof userId === 'string' && userId.length > 0;
};