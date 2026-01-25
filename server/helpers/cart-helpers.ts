import { NotFoundError } from "shared";
import Product from "../models/Product";
import { ICart } from "../types/cart-types/i-cart";

export const CART_POPULATION_CONFIG = {
  path: "items.productId",
  select: "image title price salePrice",
};

export const transformCartItems = (cart: ICart) => {
  return cart.items.map((item) => ({
    productId: item.productId?._id || null,
    image: item.productId?.image || null,
    title: item.productId?.title || null,
    price: item.productId?.price || null,
    salePrice: item.productId?.salePrice || null,
    quantity: item.quantity,
  }));
};

export const createCartResponse = (cart: ICart, message: string) => ({
  success: true,
  message,
  data: {
    ...cart.toObject(),
    items: transformCartItems(cart),
  },
});

export const validateCartRequest = (
  userId: string,
  productId?: string,
  quantity?: number,
) => {
  if (!userId) {
    return { isValid: false, message: "User ID is required" };
  }
  if (productId !== undefined && !productId) {
    return { isValid: false, message: "Product ID is required" };
  }
  if (quantity !== undefined && (!quantity || quantity <= 0)) {
    return { isValid: false, message: "Valid quantity is required" };
  }
  return { isValid: true };
};

// Removed - use CartService.findOrCreateCart instead

export const validateProductExists = async (productId: string) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new NotFoundError("Product");
  }
  return product;
};

// Removed - use handleError from error-handler.ts instead

export const cleanupInvalidCartItems = async (
  cart: ICart,
): Promise<boolean> => {
  const validItems = cart.items.filter((item) => item.productId !== null);
  const hasInvalidItems = validItems.length < cart.items.length;

  if (hasInvalidItems) {
    cart.items = validItems;
    await cart.save();
  }

  return hasInvalidItems;
};
