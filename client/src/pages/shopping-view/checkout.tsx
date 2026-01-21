import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createNewOrder } from "@/store/shop/order-slice";
import { AppDispatch, RootState } from "@/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartItem } from "shared/src/cart-types";
import img from "../../assets/account.jpg";

interface AddressData {
  _id: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  notes: string;
}

function ShoppingCheckout() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { user } = useSelector((state: RootState) => state.auth);
  const { cartItems } = useSelector((state: RootState) => state.shopCart);
  const { approvalURL, isLoading } = useSelector(
    (state: RootState) => state.shopOrder,
  );

  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(
    null,
  );

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum: number, currentItem: CartItem) =>
            sum +
            ((currentItem?.salePrice ?? 0) > 0
              ? (currentItem?.salePrice ?? 0)
              : (currentItem?.price ?? 0)) *
              (currentItem?.quantity ?? 0),
          0,
        )
      : 0;

  const handleCheckout = async () => {
    if (!selectedAddress) {
      toast({
        title: "Adres Seçiniz",
        description: "Devam etmek için bir teslimat adresi seçmelisiniz.",
        variant: "destructive",
      });
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      toast({
        title: "Sepet Boş",
        description: "Sepetinizde ürün bulunmuyor.",
        variant: "destructive",
      });
      return;
    }

    if (!user?.id) {
      toast({
        title: "Oturum Hatası",
        description: "Lütfen giriş yapınız.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user.id,
      cartId: user.id, // Using user id as cart id for simplicity
      cartItems: cartItems.map((item: CartItem) => ({
        productId: item.productId,
        title: item.title,
        image: item.image,
        price:
          (item.salePrice ?? 0) > 0
            ? (item.salePrice ?? 0).toString()
            : (item.price ?? 0).toString(),
        quantity: item.quantity,
      })),
      addressInfo: {
        addressId: selectedAddress._id,
        address: selectedAddress.address,
        city: selectedAddress.city,
        pincode: selectedAddress.pincode,
        phone: selectedAddress.phone,
        notes: selectedAddress.notes || "",
      },
      totalAmount: totalCartAmount,
    };

    try {
      const result = await dispatch(createNewOrder(orderData)).unwrap();

      if (result.success && result.approvalURL) {
        navigate(result.approvalURL);
      } else {
        toast({
          title: "Hata",
          description: "Sipariş oluşturulurken bir hata oluştu.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Hata",
        description: "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    }
  };

  // If we have an approval URL, redirect to payment
  if (approvalURL) {
    navigate(approvalURL);
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt="checkout-bg"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={selectedAddress?._id || null}
          setCurrentSelectedAddress={setSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item: CartItem) => (
              <UserCartItemsContent key={item.productId} cartItem={item} />
            ))
          ) : (
            <p className="text-center text-gray-500">Sepetiniz boş</p>
          )}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Toplam</span>
              <span className="font-bold">${totalCartAmount.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button
              className="w-full"
              variant="default"
              onClick={handleCheckout}
              disabled={isLoading || !cartItems || cartItems.length === 0}
            >
              {isLoading ? "İşleniyor..." : "Ödeme Yap"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
