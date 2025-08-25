import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { IProduct } from "shared/src/IProduct.ts";
import { Button } from "@/components/ui/button.tsx";
import { ProductFormData } from "@/pages/admin-view/types";

function AdminProductTile({
  product,
  setFormData,
  setCurrentEditedId,
  setOpenCreateProductsDialog,
  handleDelete,
}: {
  product: IProduct;
  setFormData?: (data: ProductFormData) => void;
  setCurrentEditedId?: (id: string) => void;
  setOpenCreateProductsDialog?: (open: boolean) => void;
  handleDelete: (id: string) => void;
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold my-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${product?.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product?._id as string)}>
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
