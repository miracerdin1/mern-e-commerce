import { deleteCartItem, fetchCartItems } from "@/store/shop/cart-slice";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { Button } from "../ui/button";

function UserCarItemsContent({ cartItem }: { cartItem: any }) {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  function handleCartItemDelete(getCartItem: any) {
    if (!user?.id) {
      console.error("User not logged in or user.id is undefined");
      return;
    }
    dispatch(
      deleteCartItem({ userId: user.id, productId: getCartItem.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems({ userId: user.id }));
      }
    });
  }
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem.image}
        alt={cartItem.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-bold">{cartItem.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            variant="outline"
            className="w-8 h-8 rounded-full"
            size="icon"
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem.quantity}</span>
          <Button
            variant="outline"
            className="w-8 h-8 rounded-full"
            size="icon"
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
            (cartItem?.salePrice ? cartItem.salePrice : cartItem.price) *
            cartItem.quantity
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

export default UserCarItemsContent;
