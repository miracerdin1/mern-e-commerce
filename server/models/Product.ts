import mongoose from "mongoose";
import {IProduct} from "shared/src/IProduct";

const ProductSchema = new mongoose.Schema<IProduct>({
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,

}, {
    timestamps: true,
    versionKey: false,
})

export default mongoose.model<IProduct>("Product", ProductSchema);