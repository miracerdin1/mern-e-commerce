export interface IOrder {
    userId: string;
    cartId: string;
    cartItems: [
        {
            productId: string;
            title: string;
            image: string;
            price: string;
            quantity: number;
        }
    ];
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
