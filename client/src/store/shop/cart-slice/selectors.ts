import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

// Base selector
const selectCartState = (state: RootState) => state.cart;

// Memoized selectors for better performance
export const selectCartItems = createSelector(
    [selectCartState],
    (cart) => cart.cartItems
);

export const selectCartLoading = createSelector(
    [selectCartState],
    (cart) => cart.isLoading
);

export const selectCartError = createSelector(
    [selectCartState],
    (cart) => cart.error
);

export const selectCartItemCount = createSelector(
    [selectCartItems],
    (items) => items.reduce((total: number, item) => total + item.quantity, 0)
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (items) => {
        if (items.length === 0) return 0;
        return items.reduce((total: number, item) => {
            const price = item.salePrice || item.price || 0;
            return total + (price * item.quantity);
        }, 0);
    }
);

export const selectCartItemById = createSelector(
    [selectCartItems, (_, productId: string) => productId],
    (items, productId) => items.find((item) => item.productId === productId)
);