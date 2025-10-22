import mongoose from "mongoose";
import {IUser} from "./User";
import {ICart} from "../types/cart-types/i-cart";
import {IProduct} from "shared/src/IProduct";

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
        },

    ],
}, {
    timestamps: true
});

export default mongoose.model<ICart>("Cart", CartSchema);

