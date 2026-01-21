import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface CartItem {
  productId: string;
  title: string;
  image: string;
  price: string;
  quantity: number;
}

interface AddressInfo {
  addressId: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  notes: string;
}

interface Order {
  _id: string;
  userId: string;
  cartId: string;
  cartItems: CartItem[];
  addressInfo: AddressInfo;
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  orderDate: Date;
  orderUpdateDate: Date;
  paymentId: string;
  payerId: string;
}

interface OrderState {
  approvalURL: string | null;
  isLoading: boolean;
  orderId: string | null;
  orderList: Order[];
  orderDetails: Order | null;
}

const initialState: OrderState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

interface CreateOrderPayload {
  userId: string;
  cartId: string;
  cartItems: CartItem[];
  addressInfo: AddressInfo;
  totalAmount: number;
}

interface CapturePaymentPayload {
  orderId: string;
  payerId?: string;
  paymentId?: string;
}

export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",
  async (orderData: CreateOrderPayload) => {
    const response = await axios.post(
      "http://localhost:3000/api/shop/order/create",
      orderData,
    );
    return response.data;
  },
);

export const capturePayment = createAsyncThunk(
  "order/capturePayment",
  async (paymentData: CapturePaymentPayload) => {
    const response = await axios.post(
      "http://localhost:3000/api/shop/order/capture",
      paymentData,
    );
    return response.data;
  },
);

export const getAllOrdersByUserId = createAsyncThunk(
  "order/getAllOrdersByUserId",
  async (userId: string) => {
    const response = await axios.get(
      `http://localhost:3000/api/shop/order/list/${userId}`,
    );
    return response.data;
  },
);

export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (orderId: string) => {
    const response = await axios.get(
      `http://localhost:3000/api/shop/order/details/${orderId}`,
    );
    return response.data;
  },
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create new order
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      // Capture payment
      .addCase(capturePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(capturePayment.fulfilled, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(capturePayment.rejected, (state) => {
        state.isLoading = false;
      })
      // Get all orders by user
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      // Get order details
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
