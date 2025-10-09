import { EntityModel } from "@/types";
import { IProduct } from "shared/src/IProduct.ts";

export interface EditProductPayload extends EntityModel {
  formData: IProduct;
}
