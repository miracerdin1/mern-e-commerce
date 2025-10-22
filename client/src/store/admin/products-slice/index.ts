import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { EditProductPayload } from "@/store/admin/edit-product-payload.interface.ts";
import { ProductFormData } from "@/pages/admin-view/types";
import { AddProductResponse } from "shared/src/AddProductResponse.ts";
import { IProduct } from "shared/src/IProduct.ts";
import { API_ENDPOINTS } from "@/config/api";

const initialState: { productList: IProduct[]; isLoading: boolean } = {
  productList: [],
  isLoading: false,
};

export const addNewProduct = createAsyncThunk<
  AddProductResponse,
  ProductFormData
>("/products/addnewproduct", async (formData) => {
  const result = await axios.post(
    API_ENDPOINTS.ADMIN.PRODUCTS.ADD,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return result.data;
});

export const fetchAllProduct = createAsyncThunk(
  "/products/fetchAllProduct",
  async () => {
    const result = await axios.get(API_ENDPOINTS.ADMIN.PRODUCTS.GET);
    return result.data;
  },
);

export const editProduct = createAsyncThunk<
  AddProductResponse,
  EditProductPayload
>("/products/editProduct", async ({ id, formData }) => {
  const result = await axios.put(
    API_ENDPOINTS.ADMIN.PRODUCTS.EDIT(id),
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return result.data;
});

export const deleteProduct = createAsyncThunk<boolean, string>(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(API_ENDPOINTS.ADMIN.PRODUCTS.DELETE(id));
    return result.data;
  },
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        console.log("action.error", action.error);
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
