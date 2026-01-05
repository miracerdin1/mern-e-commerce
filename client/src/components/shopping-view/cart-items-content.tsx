import { toast } from "@/hooks/use-toast";
import {
  deleteCartItem,
  fetchCartItems,
  updateCartQuantity,
} from "@/store/shop/cart-slice";
import { AppDispatch, RootState } from "@/store/store";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";

function UserCartItemsContent({ cartItem }: { cartItem: any }) {
  const { user } = useSelector((state: RootState) => state.auth);
  const { cartItems } = useSelector((state: RootState) => state.shopCart);
  const { productList } = useSelector((state: RootState) => state.shopProducts);
  const dispatch = useDispatch<AppDispatch>();

  function handleUpdateQuantity(getCartItem: any, quantity: number) {
    if (!user?.id) {
      console.error("User not logged in");
      return;
    }

    if (quantity === 1) {
      const getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );

        if (getCurrentProductIndex === -1) {
          toast({
            title: "Product not found",
            variant: "destructive",
          });
          return;
        }

        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        console.log(getCurrentProductIndex, getTotalStock, "getTotalStock");

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + quantity > getTotalStock) {
            toast({
              title: `Only ${getTotalStock} items available in stock`,
              variant: "destructive",
            });

            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user.id,
        productId: getCartItem?.productId,
        quantity: getCartItem?.quantity + quantity,
      })
    )
      .unwrap()
      .then((data) => {
        if (data?.success) {
          dispatch(fetchCartItems({ userId: user.id }));
          toast({
            title: "Cart item is updated successfully",
          });
        }
      })
      .catch((error) => {
        console.error("Failed to update cart:", error);
        toast({
          title: "Error",
          description: "Failed to update cart item",
          variant: "destructive",
        });
      });
  }

  function handleCartItemDelete(getCartItem: any) {
    if (!user?.id) {
      console.error("User not logged in");
      return;
    }

    dispatch(
      deleteCartItem({ userId: user.id, productId: getCartItem?.productId })
    )
      .unwrap()
      .then((data) => {
        if (data?.success) {
          dispatch(fetchCartItems({ userId: user.id }));
          toast({
            title: "Cart item is deleted successfully",
          });
        }
      })
      .catch((error) => {
        console.error("Failed to delete cart item:", error);
        toast({
          title: "Error",
          description: "Failed to delete cart item",
          variant: "destructive",
        });
      });
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, -1)}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, 1)}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
