import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { EditProductPayload } from "@/store/admin/edit-product-payload.interface.ts";
import { ProductFormData } from "@/pages/admin-view/products.tsx";

const initialState = {
  productList: [],
  isLoading: false,
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:3000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return result.data;
  },
);

export const fetchAllProduct = createAsyncThunk(
  "/products/fetchAllProduct",
  async () => {
    const result = await axios.get(
      "http://localhost:3000/api/admin/products/get",
    );
    return result.data;
  },
);

export const editProduct = createAsyncThunk<
  ProductFormData,
  EditProductPayload
>("/products/editProduct", async ({ id, formData }) => {
  const result = await axios.put(
    `http://localhost:3000/api/admin/products/edit/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return result.data;
});

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:3000/api/admin/products/delete/${id}`,
    );
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
