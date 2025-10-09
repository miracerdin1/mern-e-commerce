import {Request, Response} from "express";

import Product from '../../models/Product';

const getFilteredProducts = async (req: Request, res: Response) => {
    try {
        // Simulate fetching products from a database or service
        const products = await Product.find({})
        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({success: false, message: 'Error fetching products',});
    }
};

export default getFilteredProducts;