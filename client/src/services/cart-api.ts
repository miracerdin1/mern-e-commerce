import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";
import { CartApiResponse, AddToCartRequest } from "shared/src/cart-types";

export const cartApi = {
    addToCart: async ({ userId, productId, quantity }: AddToCartRequest): Promise<CartApiResponse> => {
        try {
            const response = await axios.post(
                API_ENDPOINTS.CART.ADD,
                { userId, productId, quantity },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to add item to cart';
            const errorCode = error.response?.data?.code || 'UNKNOWN_ERROR';
            const apiError = new Error(errorMessage);
            (apiError as any).code = errorCode;
            (apiError as any).statusCode = error.response?.status || 500;
            throw apiError;
        }
    },

    fetchCartItems: async (userId: string): Promise<CartApiResponse> => {
        const response = await axios.get(API_ENDPOINTS.CART.GET(userId));
        return response.data;
    },

    updateCartQuantity: async ({ userId, productId, quantity }: AddToCartRequest): Promise<CartApiResponse> => {
        const response = await axios.put(
            API_ENDPOINTS.CART.UPDATE,
            { userId, productId, quantity },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    },

    deleteCartItem: async (userId: string, productId: string): Promise<CartApiResponse> => {
        const response = await axios.delete(
            API_ENDPOINTS.CART.DELETE(userId, productId)
        );
        return response.data;
    },
};