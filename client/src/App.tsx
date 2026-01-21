import AdminLayout from "@/components/admin-view/layout.tsx";
import AuthLayout from "@/components/auth/layout.tsx";
import CheckAuth from "@/components/common/check-auth.tsx";
import ShoppingLayout from "@/components/shopping-view/layout.tsx";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";
import AdminDashboard from "@/pages/admin-view/dashboard.tsx";
import AdminFeatures from "@/pages/admin-view/features.tsx";
import AdminOrders from "@/pages/admin-view/orders.tsx";
import AdminProducts from "@/pages/admin-view/products.tsx";
import AuthLogin from "@/pages/auth/login.tsx";
import AuthRegister from "@/pages/auth/register.tsx";
import NotFound from "@/pages/not-found";
import ShoppingAccount from "@/pages/shopping-view/account.tsx";
import ShoppingCheckout from "@/pages/shopping-view/checkout.tsx";
import ShoppingHome from "@/pages/shopping-view/home.tsx";
import ShoppingListing from "@/pages/shopping-view/listing.tsx";
import MockPayment from "@/pages/shopping-view/mock-payment.tsx";
import PaymentSuccess from "@/pages/shopping-view/payment-success.tsx";
import UnauthPage from "@/pages/unauth-page";
import { checkAuth } from "@/store/auth-slice";
import { AppDispatch, RootState } from "@/store/store.ts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

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
    <div className="flex flex-col min-h-screen w-full">
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
          <Route path="mock-payment" element={<MockPayment />}></Route>
          <Route path="payment-success" element={<PaymentSuccess />}></Route>
          <Route path="account" element={<ShoppingAccount />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/unauth-page" element={<UnauthPage />}></Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
