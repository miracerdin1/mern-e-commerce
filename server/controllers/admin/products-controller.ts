import {imageUploadUtils} from "../../helpers/cloudinary";
import {RequestHandler} from "express";
import Product from "../../models/Product";
import {Request, Response} from "express";
import product from "../../models/Product";

export const handleImageUpload: RequestHandler = async (req, res) => {
    try {
        const file = req.file as Express.Multer.File;
        const b64 = Buffer.from(file.buffer).toString('base64');
        const url = `data:${file.mimetype};base64,${b64}`;
        const result = await imageUploadUtils(url);

        res.json({
            success: true,
            result
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Image upload failed',
        })
    }
}

//add
export const addProduct = async (req: Request, res: Response) => {
    try {
        const {image, title, description, price, brand, totalStock, category, salePrice} = req.body;
        const newlyCreatedProduct = new Product({
            image,
            title,
            description,
            price,
            brand,
            totalStock,
            category,
            salePrice
        })
        await newlyCreatedProduct.save();
        res.status(201).json({
            success: true,
            data: newlyCreatedProduct
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Error Occured",
        });
    }
}
//fetch
export const fetchProducts = async (req: Request, res: Response) => {
    try {
        const listOfProducts = await Product.find();
        res.status(200).json({
            success: true,
            data: listOfProducts
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Error Occured",
        });
    }
}
//edit

export const editProduct: RequestHandler = async (req, res) => {
    try {
        const {id} = req.params;
        const updated = await Product.findByIdAndUpdate(id, req.body, {new: true});

        res.status(200).json({
            success: true,
            data: updated,
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Error Occurred",
        });
    }
};
//delete

export const deleteProduct: RequestHandler = async (req, res) => {
    try {
        const {id} = req.params;
        await Product.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Product deleted",
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Error Occurred",
        });
    }
};