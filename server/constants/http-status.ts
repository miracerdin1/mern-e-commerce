export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const SUCCESS_MESSAGES = {
  CART: {
    ITEM_ADDED: "Item added to cart successfully",
    ITEM_UPDATED: "Cart updated successfully",
    ITEM_REMOVED: "Item removed from cart successfully",
    FETCHED: "Cart items fetched successfully",
  },
  ORDER: {
    CREATED: "Order created successfully",
    PAYMENT_CAPTURED: "Payment captured successfully",
    FETCHED: "Orders fetched successfully",
    DETAILS_FETCHED: "Order details fetched successfully",
  },
} as const;

export const ERROR_MESSAGES = {
  CART: {
    ADD_FAILED: "Failed to add item to cart",
    UPDATE_FAILED: "Failed to update cart quantity",
    DELETE_FAILED: "Failed to remove item from cart",
    FETCH_FAILED: "Failed to fetch cart items",
    NOT_FOUND: "Cart not found",
    PRODUCT_NOT_FOUND: "Product not found in cart",
  },
  ORDER: {
    CREATE_FAILED: "Failed to create order",
    CAPTURE_FAILED: "Failed to capture payment",
    FETCH_FAILED: "Failed to fetch orders",
    NOT_FOUND: "Order not found",
  },
} as const;
