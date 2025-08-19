import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "@/components/auth/layout.tsx";
import AuthLogin from "@/pages/auth/login.tsx";
import AuthRegister from "@/pages/auth/register.tsx";
import AdminLayout from "@/components/admin-view/layout.tsx";
import AdminDashboard from "@/pages/admin-view/dashboard.tsx";
import AdminProducts from "@/pages/admin-view/products.tsx";
import AdminOrders from "@/pages/admin-view/orders.tsx";
import AdminFeatures from "@/pages/admin-view/features.tsx";
import ShoppingLayout from "@/components/shopping-view/layout.tsx";
import NotFound from "@/pages/not-found";
import ShoppingHome from "@/pages/shopping-view/home.tsx";
import ShoppingAccount from "@/pages/shopping-view/account.tsx";
import ShoppingListing from "@/pages/shopping-view/listing.tsx";
import ShoppingCheckout from "@/pages/shopping-view/checkout.tsx";
import CheckAuth from "@/components/common/check-auth.tsx";
import UnauthPage from "@/pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store.ts";
import { useEffect } from "react";
import { checkAuth } from "@/store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="h-[600px] w-[600px]" />;
  return (
    <div className="flex flex-col overflow-hidden h-screen w-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/shop/home" replace />} />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />}></Route>
          <Route path="register" element={<AuthRegister />}></Route>
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />}></Route>
          <Route path="products" element={<AdminProducts />}></Route>
          <Route path="orders" element={<AdminOrders />}></Route>
          <Route path="features" element={<AdminFeatures />}></Route>
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />}></Route>
          <Route path="listing" element={<ShoppingListing />}></Route>
          <Route path="checkout" element={<ShoppingCheckout />}></Route>
          <Route path="account" element={<ShoppingAccount />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/unauth-page" element={<UnauthPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
