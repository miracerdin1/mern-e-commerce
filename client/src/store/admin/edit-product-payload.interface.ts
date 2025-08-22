import { EntityModel } from "@/types";
import { ProductFormData } from "@/pages/admin-view/products.tsx";

export interface EditProductPayload extends EntityModel {
  formData: ProductFormData;
}
