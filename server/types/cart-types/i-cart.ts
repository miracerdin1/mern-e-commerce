import {Document, Types} from "mongoose";
import {ICartItem} from "./i-cart-item";

export interface ICart extends Document {
    userId: Types.ObjectId;
    items: ICartItem[];
    createdAt?: Date;
    updatedAt?: Date;
}