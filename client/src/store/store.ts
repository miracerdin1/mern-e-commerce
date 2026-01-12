import authReducer from "@/store/auth-slice";
import { configureStore } from "@reduxjs/toolkit";
import AdminProductsSlice from "./admin/products-slice";
import shopAddressSlice from "./shop/address-slice";
import shopCartSlice from "./shop/cart-slice";
import ShopProductSlice from "./shop/products-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice,
    shopProducts: ShopProductSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
