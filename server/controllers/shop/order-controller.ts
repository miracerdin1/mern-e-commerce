import { Request, Response } from "express";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../constants/http-status";
import Cart from "../../models/Cart";
import Order from "../../models/Order";

// Mock payment simulation delay (ms)
const PAYMENT_SIMULATION_DELAY = 2000;

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    const newOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus: orderStatus || "pending",
      paymentMethod: paymentMethod || "mock-payment",
      paymentStatus: paymentStatus || "pending",
      totalAmount,
      orderDate: orderDate || new Date(),
      orderUpdateDate: orderUpdateDate || new Date(),
      paymentId,
      payerId,
    });

    await newOrder.save();

    // Generate mock approval URL (simulates PayPal redirect)
    const approvalURL = `/shop/mock-payment?orderId=${newOrder._id}`;

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      approvalURL,
      orderId: newOrder._id,
      message: SUCCESS_MESSAGES.ORDER.CREATED,
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.ORDER.CREATE_FAILED,
    });
  }
};

const capturePayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId, payerId, paymentId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: ERROR_MESSAGES.ORDER.NOT_FOUND,
      });
      return;
    }

    // Simulate payment processing delay
    await new Promise((resolve) =>
      setTimeout(resolve, PAYMENT_SIMULATION_DELAY),
    );

    // Update order with payment info
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.payerId = payerId || `MOCK_PAYER_${Date.now()}`;
    order.paymentId = paymentId || `MOCK_TXN_${Date.now()}`;
    order.orderUpdateDate = new Date();

    await order.save();

    // Clear the user's cart after successful payment
    await Cart.findByIdAndDelete(order.cartId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.ORDER.PAYMENT_CAPTURED,
      data: order,
    });
  } catch (error) {
    console.error("Capture payment error:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.ORDER.CAPTURE_FAILED,
    });
  }
};

const getAllOrdersByUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).sort({ orderDate: -1 });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: orders,
      message: SUCCESS_MESSAGES.ORDER.FETCHED,
    });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.ORDER.FETCH_FAILED,
    });
  }
};

const getOrderDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: ERROR_MESSAGES.ORDER.NOT_FOUND,
      });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: order,
      message: SUCCESS_MESSAGES.ORDER.DETAILS_FETCHED,
    });
  } catch (error) {
    console.error("Get order details error:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.ORDER.FETCH_FAILED,
    });
  }
};

export { capturePayment, createOrder, getAllOrdersByUser, getOrderDetails };
