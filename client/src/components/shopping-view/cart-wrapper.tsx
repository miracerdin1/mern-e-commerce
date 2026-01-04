import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCarItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems }: { cartItems: any }) {
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader className="text-2xl font-bold">
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (
              <UserCarItemsContent key={item.id} cartItem={item} />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="text-lg font-bold">Total:</span>
          <span className="text-lg font-bold">${cartItems?.totalPrice}</span>
        </div>
        <Button className="w-full mt-5">Checkout</Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
