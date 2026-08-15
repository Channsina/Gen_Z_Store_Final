import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../customer/About";
import Products from "../customer/Products";
import Contact from "../customer/Contact";
import Checkout from "../customer/Checkout";

import AdminLayout from "../admin/AdminLayout";
import Dashboard from "../admin/Dashboard";
import AdminOrders from "../admin/Order";
import AdminProducts from "../admin/Products";
import AdminStock from "../admin/Stock";
import AdminMessages from "../admin/Message";
import AdminUsers from "../admin/Customer";

function StoreLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Admin dashboard - its own sidebar layout, no storefront navbar/footer */}
      <Route path="/dashboard" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="stock" element={<AdminStock />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>

      {/* Storefront */}
      <Route
        path="/*"
        element={
          <StoreLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </StoreLayout>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
