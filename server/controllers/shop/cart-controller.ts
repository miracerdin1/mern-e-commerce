import { Request, Response } from "express";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../constants/http-status";
import { createCartResponse } from "../../helpers/cart-helpers";
import { handleError } from "../../helpers/error-handler";
import { CartService } from "../../services/cart-service";

const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await CartService.addItemToCart(userId, productId, quantity);
    res
      .status(HTTP_STATUS.OK)
      .json(createCartResponse(cart, SUCCESS_MESSAGES.CART.ITEM_ADDED));
  } catch (error) {
    handleError(error, res, ERROR_MESSAGES.CART.ADD_FAILED);
  }
};

const fetchCartItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const cart = await CartService.getCartWithValidItems(userId as string);

    if (!cart) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: ERROR_MESSAGES.CART.NOT_FOUND,
      });
      return;
    }

    res
      .status(HTTP_STATUS.OK)
      .json(createCartResponse(cart, SUCCESS_MESSAGES.CART.FETCHED));
  } catch (error) {
    handleError(error, res, ERROR_MESSAGES.CART.FETCH_FAILED);
  }
};

const updateCartQnt = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, productId, quantity } = req.body;
    const cart = await CartService.updateCartItemQuantity(
      userId,
      productId,
      quantity,
    );

    if (!cart) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: ERROR_MESSAGES.CART.PRODUCT_NOT_FOUND,
      });
      return;
    }

    res
      .status(HTTP_STATUS.OK)
      .json(createCartResponse(cart, SUCCESS_MESSAGES.CART.ITEM_UPDATED));
  } catch (error) {
    handleError(error, res, ERROR_MESSAGES.CART.UPDATE_FAILED);
  }
};

const deleteCartItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, productId } = req.params;
    const cart = await CartService.removeCartItem(
      userId as string,
      productId as string,
    );

    if (!cart) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: ERROR_MESSAGES.CART.PRODUCT_NOT_FOUND,
      });
      return;
    }

    res
      .status(HTTP_STATUS.OK)
      .json(createCartResponse(cart, SUCCESS_MESSAGES.CART.ITEM_REMOVED));
  } catch (error) {
    handleError(error, res, ERROR_MESSAGES.CART.DELETE_FAILED);
  }
};

export { addToCart, deleteCartItem, fetchCartItems, updateCartQnt };
