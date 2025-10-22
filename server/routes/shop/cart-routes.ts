import { addToCart, fetchCartItems, deleteCartItem, updateCartQnt } from "../../controllers/shop/cart-controller";
import { validateAddToCart, validateUpdateCart, validateCartParams } from "../../middleware/cart-validation";
import express from "express";

const router = express.Router();

router.post('/add', validateAddToCart, addToCart);
router.get('/get/:userId', validateCartParams, fetchCartItems);
router.put('/update-cart', validateUpdateCart, updateCartQnt);
router.delete('/:userId/:productId', validateCartParams, deleteCartItem);

export default router;