export interface ProductImageUploadProps {
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  uploadedImageUrl: string;
  setUploadedImageUrl: (url: string) => void;
  setImageLoadingState: (value: boolean) => void;
}

export type ProductFormData = {
  image: null;
  name: string;
  description: string;
  brand: string;
  price: number;
  salePrice: number;
  totalStock: number;
  category: string;
};
