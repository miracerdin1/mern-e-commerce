import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { IProduct } from "shared/src/IProduct.ts";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddToCart,
}: {
  product: IProduct;
  handleGetProductDetails: any;
  handleAddToCart: (productId: string | number) => void;
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="cursor-pointer"
      >
        <div className="relative">
          <img
            src={product?.image}
            alt={product.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-700">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px] text-muted-foreground">
              {
                categoryOptionsMap[
                  product?.category as keyof typeof categoryOptionsMap
                ]
              }
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand as keyof typeof brandOptionsMap]}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span
              className={`${product?.salePrice ? "line-through" : ""} text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button
          onClick={() => handleAddToCart(product?._id)}
          className="w-full"
        >
          Add to Card
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
