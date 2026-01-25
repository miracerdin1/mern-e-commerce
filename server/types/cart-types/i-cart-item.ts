import { IProduct } from "shared";

export interface ICartItem {
  productId: IProduct;
  quantity: number;
}
