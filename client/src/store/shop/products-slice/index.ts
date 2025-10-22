import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductFormData } from "@/pages/admin-view/types";
import { IProduct } from "shared/src/IProduct.ts";

interface FetchProductsPayload {
  filterParams: Record<string, any>;
  sortParams: string;
}

interface ProductState {
  productList: IProduct[];
  isLoading: boolean;
  productDetails: ProductFormData | null;
}

const initialState: ProductState = {
  productList: [],
  isLoading: false,
  productDetails: null,
};

export const fetchAllFilteredProducts = createAsyncThunk<
  any, // ✅ Dönen data tipi (örneğin: IProduct[])
  FetchProductsPayload // ✅ Parametre tipi
>("/products/fetchAllProducts", async ({ filterParams, sortParams }) => {
  const query = new URLSearchParams({ ...filterParams, sortBy: sortParams });
  const result = await axios.get(
    `http://localhost:3000/api/shop/products/get?${query}`,
  );
  return result.data;
});

export const fetchProductDetails = createAsyncThunk<
  any, // ✅ Dönen veri tipi (örneğin IProduct)
  string // ✅ Parametre tipi (id)
>("/products/fetchProductDetails", async (id) => {
  const result = await axios.get(
    `http://localhost:3000/api/shop/products/get/${id}`,
  );
  return result.data;
});

const ShopProductsSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export default ShopProductsSlice.reducer;
