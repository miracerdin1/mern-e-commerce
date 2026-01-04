const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
  // Shop Cart endpoints
  CART: {
    ADD: `${API_BASE_URL}/api/shop/cart/add`,
    GET: (userId: string) => `${API_BASE_URL}/api/shop/cart/get/${userId}`,
    UPDATE: `${API_BASE_URL}/api/shop/cart/update-cart`,
    DELETE: (userId: string, productId: string) =>
      `${API_BASE_URL}/api/shop/cart/${userId}/${productId}`,
  },
  // Admin Product endpoints
  ADMIN: {
    PRODUCTS: {
      ADD: `${API_BASE_URL}/api/admin/products/add`,
      GET: `${API_BASE_URL}/api/admin/products/get`,
      EDIT: (id: string) => `${API_BASE_URL}/api/admin/products/edit/${id}`,
      DELETE: (id: string) => `${API_BASE_URL}/api/admin/products/delete/${id}`,
    },
  },
} as const;

export default API_BASE_URL;
