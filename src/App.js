import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CartPage from "./pages/CartPage";

import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageProducts from "./components/Admin/ManageProducts";
import ManageUsers from "./components/Admin/ManageUsers";
import AdminLogin from "./pages/AdminLogin";
import PrivateAdminRoute from "./components/Admin/PrivateAdminRoute";

import { ProductProvider } from "./context/ProductContext";

const App = () => {
  return (
    <ProductProvider>
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<CartPage />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<PrivateAdminRoute><AdminDashboard /></PrivateAdminRoute>} />
            <Route path="/admin/products" element={<PrivateAdminRoute><ManageProducts /></PrivateAdminRoute>} />
            <Route path="/admin/users" element={<PrivateAdminRoute><ManageUsers /></PrivateAdminRoute>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ProductProvider>
  );
};

export default App;
