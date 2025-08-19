import express from "express";
import {upload} from "../../helpers/cloudinary";
import {handleImageUpload} from "../../controllers/admin/products-controller";

const router = express.Router();

// "my_file" -> input name attribute
router.post("/upload-image", upload.single("my_file"), handleImageUpload);

export default router;
