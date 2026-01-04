import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CartState,
  CartApiResponse,
  AddToCartRequest,
  UpdateCartRequest,
  DeleteCartItemRequest,
} from "shared/src/cart-types";
import { cartApi } from "@/services/cart-api";

interface FetchCartPayload {
  userId: string;
}

const initialState: CartState = {
  cartItems: [],
  isLoading: false,
  error: null,
  lastUpdated: null,
};

export const addToCart = createAsyncThunk<CartApiResponse, AddToCartRequest>(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    return await cartApi.addToCart({ userId, productId, quantity });
  },
);

export const fetchCartItems = createAsyncThunk<
  CartApiResponse,
  FetchCartPayload
>("cart/fetchCartItems", async ({ userId }) => {
  return await cartApi.fetchCartItems(userId);
});

export const updateCartQuantity = createAsyncThunk<
  CartApiResponse,
  UpdateCartRequest
>("cart/updateCartQuantity", async ({ userId, productId, quantity }) => {
  return await cartApi.updateCartQuantity({ userId, productId, quantity });
});

export const deleteCartItem = createAsyncThunk<
  CartApiResponse,
  DeleteCartItemRequest
>("cart/deleteCartItem", async ({ userId, productId }) => {
  return await cartApi.deleteCartItem(userId, productId);
});

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.error = null;
      state.lastUpdated = Date.now();
    },
    // Optimistic updates
    optimisticAddToCart: (state, action) => {
      const { productId, quantity, productData } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === productId,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({
          productId,
          quantity,
          ...productData,
        });
      }
      state.lastUpdated = Date.now();
    },
    optimisticUpdateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.productId === productId);
      if (item) {
        item.quantity = quantity;
        state.lastUpdated = Date.now();
      }
    },
    optimisticRemoveItem: (state, action) => {
      const { productId } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== productId,
      );
      state.lastUpdated = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lastUpdated = Date.now();
        if (action.payload.success && action.payload.data) {
          state.cartItems = action.payload.data.items;
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to add item to cart";
      })
      // Fetch cart items
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lastUpdated = Date.now();
        if (action.payload.success && action.payload.data?.items) {
          state.cartItems = action.payload.data.items;
        }
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch cart items";
        state.cartItems = [];
      })
      // Update cart quantity
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lastUpdated = Date.now();
        if (action.payload.success && action.payload.data?.items) {
          state.cartItems = action.payload.data.items;
        }
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to update cart quantity";
      })
      // Delete cart item
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lastUpdated = Date.now();
        if (action.payload.success && action.payload.data?.items) {
          state.cartItems = action.payload.data.items;
        }
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to delete cart item";
      });
  },
});

export const {
  clearCart,
  optimisticAddToCart,
  optimisticUpdateQuantity,
  optimisticRemoveItem,
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
