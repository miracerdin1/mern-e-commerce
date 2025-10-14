import {Request, Response} from "express";

import Product from '../../models/Product';

const getFilteredProducts = async (req: Request, res: Response) => {
    try {
        const category = Array.isArray(req.query.category)
            ? req.query.category.join(",")
            : (req.query.category as string) || "";

        const brand = Array.isArray(req.query.brand)
            ? req.query.brand.join(",")
            : (req.query.brand as string) || "";

        const sortBy = (req.query.sortBy as string) || "price-lowtohigh";

        const filters: Record<string, any> = {};

        if (category.length > 0) {
            filters.category = {$in: category.split(",")};
        }

        if (brand.length > 0) {
            filters.brand = {$in: brand.split(",")}
        }

        let sort: Record<string, 1 | -1> = {};
        switch (sortBy) {
            case "price-lowtohigh":
                sort.price = 1
                break
            case "price-hightolow":
                sort.price = -1
                break
            case "title-atoz":
                sort.title = 1
                break
            case "title-ztoa":
                sort.title = -1
                break
            default:
                sort.price = 1
                break
        }
        const products = await Product.find(filters).sort(sort);
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