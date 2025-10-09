export interface IProduct {
    _id: string | number;
    image: string;
    title: string;
    description: string;
    category: string;
    brand: string;
    price: number;
    salePrice: number;
    totalStock: number;
    createdAt?: string;
    updatedAt?: string;
}