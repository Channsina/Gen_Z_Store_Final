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
import Dashboard from "../admin/Dashboard";
import Checkout from "../customer/Checkout";

function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default AppRoutes;
