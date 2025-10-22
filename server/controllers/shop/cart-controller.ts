import { Request, Response } from "express";
import { CartService } from '../../services/cart-service';
import { createCartResponse } from '../../helpers/cart-helpers';
import { handleError } from '../../helpers/error-handler';
import { HTTP_STATUS, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../../constants/http-status';
import { Logger } from '../../utils/logger';

const addToCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, productId, quantity } = req.body;
        Logger.info('Adding item to cart', { userId, productId, quantity });

        const cart = await CartService.addItemToCart(userId, productId, quantity);
        res.status(HTTP_STATUS.OK).json(createCartResponse(cart, SUCCESS_MESSAGES.CART.ITEM_ADDED));
    } catch (error) {
        Logger.error('Failed to add item to cart', error);
        handleError(error, res, ERROR_MESSAGES.CART.ADD_FAILED);
    }
};

const fetchCartItems = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const cart = await CartService.getCartWithValidItems(userId);

        if (!cart) {
            res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
            return;
        }

        res.status(200).json(createCartResponse(cart, 'Cart items fetched successfully'));
    } catch (error) {
        handleError(error, res, 'Failed to fetch cart items');
    }
};

const updateCartQnt = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, productId, quantity } = req.body;
        const cart = await CartService.updateCartItemQuantity(userId, productId, quantity);

        if (!cart) {
            res.status(404).json({
                success: false,
                message: 'Cart or product not found'
            });
            return;
        }

        res.status(200).json(createCartResponse(cart, 'Cart updated successfully'));
    } catch (error) {
        handleError(error, res, 'Failed to update cart quantity');
    }
};

const deleteCartItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, productId } = req.params;
        const cart = await CartService.removeCartItem(userId, productId);

        if (!cart) {
            res.status(404).json({
                success: false,
                message: 'Cart or product not found'
            });
            return;
        }

        res.status(200).json(createCartResponse(cart, 'Item removed from cart successfully'));
    } catch (error) {
        handleError(error, res, 'Failed to remove item from cart');
    }
};

export { addToCart, fetchCartItems, updateCartQnt, deleteCartItem };