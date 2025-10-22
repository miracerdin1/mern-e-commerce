import Cart from '../models/Cart';
import Product from '../models/Product';
import { ICart } from '../types/cart-types/i-cart';
import { CART_POPULATION_CONFIG } from '../helpers/cart-helpers';
import { NotFoundError, ValidationError } from 'shared/src/error-types';
import { CART_VALIDATION } from 'shared/src/cart-types';

/**
 * Service class for cart operations
 */
export class CartService {
    /**
     * Finds existing cart or creates a new one for the user
     * @param userId - The user's ID
     * @returns Promise resolving to the cart
     */
    static async findOrCreateCart(userId: string): Promise<ICart> {
        let cart = await Cart.findOne({ userId }).lean();
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        } else {
            // Convert lean document back to mongoose document for operations
            cart = new Cart(cart);
        }
        return cart;
    }

    static async verifyProductExists(productId: string): Promise<void> {
        const product = await Product.findById(productId);
        if (!product) {
            throw new NotFoundError('Product');
        }
    }

    static async addItemToCart(userId: string, productId: string, quantity: number): Promise<ICart> {
        // Validate inputs
        if (quantity < CART_VALIDATION.MIN_QUANTITY || quantity > CART_VALIDATION.MAX_QUANTITY) {
            throw new ValidationError(
                `Quantity must be between ${CART_VALIDATION.MIN_QUANTITY} and ${CART_VALIDATION.MAX_QUANTITY}`,
                'quantity'
            );
        }

        // Verify product exists and get cart in parallel
        const [, cart] = await Promise.all([
            this.verifyProductExists(productId),
            this.findOrCreateCart(userId)
        ]);

        const existingItemIndex = cart.items.findIndex(
            item => item.productId.toString() === productId
        );

        if (existingItemIndex > -1) {
            const newQuantity = cart.items[existingItemIndex].quantity + quantity;
            if (newQuantity > CART_VALIDATION.MAX_TOTAL_QUANTITY) {
                throw new ValidationError(
                    `Total quantity cannot exceed ${CART_VALIDATION.MAX_TOTAL_QUANTITY}`,
                    'quantity'
                );
            }
            cart.items[existingItemIndex].quantity = newQuantity;
        } else {
            cart.items.push({ productId: productId as any, quantity });
        }

        await cart.save();
        await cart.populate(CART_POPULATION_CONFIG);
        return cart;
    }

    static async updateCartItemQuantity(userId: string, productId: string, quantity: number): Promise<ICart | null> {
        const cart = await Cart.findOne({ userId });
        if (!cart) return null;

        const itemIndex = cart.items.findIndex(
            item => item.productId.toString() === productId
        );
        if (itemIndex === -1) return null;

        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        await cart.populate(CART_POPULATION_CONFIG);
        return cart;
    }

    static async removeCartItem(userId: string, productId: string): Promise<ICart | null> {
        const cart = await Cart.findOne({ userId });
        if (!cart) return null;

        const initialLength = cart.items.length;
        cart.items = cart.items.filter(
            item => item.productId.toString() !== productId
        );

        if (cart.items.length === initialLength) return null;

        await cart.save();
        await cart.populate(CART_POPULATION_CONFIG);
        return cart;
    }

    static async getCartWithValidItems(userId: string): Promise<ICart | null> {
        const cart = await Cart.findOne({ userId }).populate(CART_POPULATION_CONFIG);
        if (!cart) return null;

        // Clean up invalid items
        const validItems = cart.items.filter(item => item.productId !== null);
        if (validItems.length < cart.items.length) {
            cart.items = validItems;
            await cart.save();
        }

        return cart;
    }
}