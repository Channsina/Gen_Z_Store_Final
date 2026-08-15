import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/useAuth";
import NavbarDashboard from "../components/NavbarDashboard";
import FooterDashboard from "../components/FooterDashoard";

export default function AdminLayout() {
  const { user, isAdmin, loading, profileLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading || (user && profileLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-black/50">Loading dashboard…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <h1 className="font-display font-800 text-3xl mb-3">Admin access required</h1>
          <p className="text-black/60 mb-6">
            Log in with an administrator account to view the dashboard.
          </p>
          <Link to="/login" className="inline-block rounded-full bg-purple-600 text-white font-600 px-6 py-3 hover:bg-indigo-600 transition-colors">
            Log in
          </Link>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <h1 className="font-display font-800 text-3xl mb-3">Access denied</h1>
          <p className="text-black/60 mb-6">
            Your account doesn't have administrator permissions.
          </p>
          <Link to="/" className="inline-block rounded-full bg-purple-600 text-white font-600 px-6 py-3 hover:bg-indigo-600 transition-colors">
            Back to store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        <NavbarDashboard onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1">
          <Outlet />
        </main>
        <FooterDashboard />
      </div>
    </div>
  );
}