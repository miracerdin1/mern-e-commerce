import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

interface OrderDetails {
  _id: string;
  userId: string;
  cartId: string;
  cartItems: Array<{
    productId: string;
    title: string;
    image: string;
    price: string;
    quantity: number;
  }>;
  addressInfo: {
    addressId: string;
    address: string;
    city: string;
    pincode: string;
    phone: string;
    notes: string;
  };
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  orderDate: Date;
  orderUpdateDate: Date;
  paymentId: string;
  payerId: string;
}

interface ShoppingOrderDetailsViewProps {
  orderDetails: OrderDetails | null;
}

export function ShoppingOrderDetailsView({
  orderDetails,
}: ShoppingOrderDetailsViewProps) {
  if (!orderDetails) {
    return (
      <DialogContent className="sm:max-w-[600px]">
        <div className="text-center py-8">
          <p className="text-gray-500">Sipariş detayları yükleniyor...</p>
        </div>
      </DialogContent>
    );
  }

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      pending: "bg-yellow-500",
      confirmed: "bg-green-500",
      processing: "bg-blue-500",
      shipped: "bg-purple-500",
      delivered: "bg-green-700",
      cancelled: "bg-red-500",
      paid: "bg-green-500",
    };
    return (
      <Badge className={statusColors[status] || "bg-gray-500"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold">Order ID:</p>
            <Label>#{orderDetails._id.slice(-8).toUpperCase()}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold">Order Date:</p>
            <Label>{formatDate(orderDetails.orderDate)}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold">Order Status:</p>
            {getStatusBadge(orderDetails.orderStatus)}
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold">Payment Status:</p>
            {getStatusBadge(orderDetails.paymentStatus)}
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold">Total Price:</p>
            <Label className="font-bold text-green-600">
              ${orderDetails.totalAmount.toFixed(2)}
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <p className="font-medium">Order Items:</p>
            <ul className="grid gap-3">
              {orderDetails.cartItems.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <span className="font-semibold">{item.title}</span>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span>${parseFloat(item.price).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <p className="font-medium">Shipping Information:</p>
            <div className="grid gap-0.5 text-muted-foreground">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Address:</span>
                <span>{orderDetails.addressInfo.address}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">City:</span>
                <span>{orderDetails.addressInfo.city}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Pin Code:</span>
                <span>{orderDetails.addressInfo.pincode}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Phone:</span>
                <span>{orderDetails.addressInfo.phone}</span>
              </div>
              {orderDetails.addressInfo.notes && (
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Notes:</span>
                  <span>{orderDetails.addressInfo.notes}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
