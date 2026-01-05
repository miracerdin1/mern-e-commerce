export interface ProductFormData {
  _id: string;
  image: string | null;
  title: string;
  description: string;
  brand: string;
  price: number;
  salePrice: number;
  totalStock: number;
  category: string;
}
