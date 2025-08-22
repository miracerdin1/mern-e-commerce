import express from "express";
import {upload} from "../../helpers/cloudinary";
import {
    handleImageUpload,
    addProduct,
    deleteProduct,
    editProduct,
    fetchProducts
} from "../../controllers/admin/products-controller";

const router = express.Router();

// "my_file" -> input name attribute
router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.get("/get", fetchProducts);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
