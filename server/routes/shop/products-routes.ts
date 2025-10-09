import express from "express";
import
    getFilteredProducts
    from "../../controllers/shop/products-controller";

const router = express.Router();

// "my_file" -> input name attribute

router.get("/get", getFilteredProducts);


export default router;
