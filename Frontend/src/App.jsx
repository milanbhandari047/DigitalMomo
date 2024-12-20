import React from "react";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";

import "./App.css";
import Navbar from "./globals/components/navbar/Navbar";
import Footer from "./globals/components/footer/Footer";
import { Provider } from "react-redux";
import store from "./store/store";
import Cart from "./pages/cart/Cart";
import Home from "./pages/home/Home";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import ProductDetails from "./pages/productDetails/ProductDetails";
import CheckOut from "./pages/checkout/CheckOut";
import KhaltiSuccess from "./pages/success/KhaltiSuccess";
import UserProfile from "./pages/profile/UserProfile";
import MyOrders from "./pages/myOrders/MyOrders";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import { ProctectedRouteForVendor, ProtectedRoute } from "./pages/ProtectRoute";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/productdetails/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/success" element={<KhaltiSuccess />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/myorders/:id" element={<OrderDetails />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/vendor"
              element={
                <ProctectedRouteForVendor>
                  <VendorDashboard />
                </ProctectedRouteForVendor>
              }
            /> */}
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
