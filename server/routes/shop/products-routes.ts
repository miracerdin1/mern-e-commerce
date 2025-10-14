import express from "express";
import
{getFilteredProducts, getProductDetails}
    from "../../controllers/shop/products-controller";

const router = express.Router();

// "my_file" -> input name attribute

router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductDetails);


export default router;
