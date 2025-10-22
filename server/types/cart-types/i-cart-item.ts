import {IProduct} from "shared/src/IProduct";

export interface ICartItem {
    productId: IProduct;
    quantity: number;
}