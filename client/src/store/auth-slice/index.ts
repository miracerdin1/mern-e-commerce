import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData: Record<string, any>) => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      formData,
      {
        withCredentials: true,
      },
    );
    return response.data;
  },
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData: Record<string, any>) => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      formData,
      {
        withCredentials: true,
      },
    );
    return response.data;
  },
);

export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.get(
    "http://localhost:3000/api/auth/check-auth",
    {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-cache, no-store, must-revalidate, proxy-revalidate",
      },
    },
  );
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { setUser, clearAuth } = authSlice.actions;

export default authSlice.reducer;
