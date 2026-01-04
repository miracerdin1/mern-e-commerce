import express from "express";
import {
  addToCart,
  deleteCartItem,
  fetchCartItems,
  updateCartQnt,
} from "../../controllers/shop/cart-controller";
import {
  validateAddToCart,
  validateCartParams,
  validateUpdateCart,
} from "../../middleware/cart-validation";

const router = express.Router();

router.post("/add", validateAddToCart, addToCart);
router.get("/get/:userId", validateCartParams, fetchCartItems);
router.put("/update-cart", validateUpdateCart, updateCartQnt);
router.delete("/:userId/:productId", validateCartParams, deleteCartItem);

export default router;
