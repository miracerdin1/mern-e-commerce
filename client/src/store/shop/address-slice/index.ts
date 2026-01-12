import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  addressList: [],
  isLoading: false,
};

export const addNewAddress = createAsyncThunk(
  "address/addNewAddress",
  async (formData: any) => {
    const response = await axios.post(
      "http://localhost:3000/api/shop/address/add",
      formData
    );
    return response.data;
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "address/fetchAllAddresses",
  async (userId: string) => {
    const response = await axios.get(
      `http://localhost:3000/api/shop/address/get/${userId}`
    );
    return response.data;
  }
);

export const editAddress = createAsyncThunk(
  "address/editAddress",
  async ({
    userId,
    addressId,
    formData,
  }: {
    userId: string;
    addressId: string;
    formData: any;
  }) => {
    const response = await axios.put(
      `http://localhost:3000/api/shop/address/edit/${userId}/${addressId}`,
      { formData }
    );
    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({ userId, addressId }: { userId: string; addressId: string }) => {
    const response = await axios.delete(
      `http://localhost:3000/api/shop/address/delete/${userId}/${addressId}`
    );
    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(addNewAddress.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addNewAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addressList = action.payload.data;
    });
    builder.addCase(addNewAddress.rejected, (state) => {
      state.isLoading = false;
      state.addressList = [];
    });

    builder.addCase(fetchAllAddresses.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllAddresses.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addressList = action.payload.data;
    });
    builder.addCase(fetchAllAddresses.rejected, (state) => {
      state.isLoading = false;
      state.addressList = [];
    });

    builder.addCase(editAddress.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addressList = action.payload.data;
    });
    builder.addCase(editAddress.rejected, (state) => {
      state.isLoading = false;
      state.addressList = [];
    });

    builder.addCase(deleteAddress.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addressList = action.payload.data;
    });
    builder.addCase(deleteAddress.rejected, (state) => {
      state.isLoading = false;
      state.addressList = [];
    });
  },
});

export default addressSlice.reducer;
