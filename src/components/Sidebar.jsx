import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useToast } from "../context/useToast";
import ConfirmDialog from "./ConfirmDialog";

const links = [
  { to: "/dashboard", label: "Overview", end: true, icon: "grid" },
  { to: "/dashboard/orders", label: "Orders", icon: "box" },
  { to: "/dashboard/products", label: "Products", icon: "tag" },
  { to: "/dashboard/stock", label: "Stock", icon: "layers" },
  { to: "/dashboard/messages", label: "Messages", icon: "mail" },
  { to: "/dashboard/users", label: "Users", icon: "users" },
];

const icons = {
  grid: "M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z",
  box: "M21 8L12 3 3 8l9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8",
  tag: "M20.59 13.41L11 3.83A2 2 0 009.59 3.17L4 3a1 1 0 00-1 1l.17 5.59a2 2 0 00.58 1.41l9.59 9.58a2 2 0 002.83 0l4.42-4.42a2 2 0 000-2.83zM7 7.5A1.5 1.5 0 118.5 6 1.5 1.5 0 017 7.5z",
  layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  mail: "M4 4h16v16H4zM22 6l-10 7L2 6",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
};


export default function Sidebar({ open = false, onClose = () => {} }) {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { profile, user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const displayName = profile?.fullName || user?.displayName || user?.email;

  const confirmLogout = async () => {
    setLogoutOpen(false);
    onClose();
    try {
      await logout();
      showToast("You've been logged out.", { tone: "success" });
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      showToast("Logout failed. Please try again.", { tone: "error" });
    }
  };

  const NavContent = (
    <div className="flex flex-col h-full">
      <div className="px-5 py-6">
        <Link to="/" className="text-xl font-bold text-white">
          GenZ Store
          <span className="text-purple-300 font-medium text-sm block mt-0.5">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-purple-600 text-white"
                  : "text-purple-100/80 hover:bg-purple-800/60 hover:text-white"
              }`
            }
          >
            <svg className="shrink-0" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d={icons[l.icon]} />
            </svg>
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-5 pt-3 border-t border-purple-800/60">
        <div className="px-3 py-2 mb-2">
          <p className="text-xs text-purple-300">Signed in as</p>
          <p className="text-sm text-white font-medium truncate">{displayName}</p>
        </div>
        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-purple-100/80 hover:bg-purple-800/60 hover:text-white transition-colors"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          View Store
        </Link>
        <button
          type="button"
          onClick={() => setLogoutOpen(true)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-300 hover:bg-red-950/40 hover:text-red-200 transition-colors cursor-pointer"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 5v1a3 3 0 01-3 3H6a3 3 0 01-3-3V6a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <div className="relative w-72 bg-purple-950 h-full shadow-xl">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white cursor-pointer"
              aria-label="Close menu"
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {NavContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 bg-purple-950 min-h-screen sticky top-0">
        {NavContent}
      </aside>

      <ConfirmDialog
        open={logoutOpen}
        title="Log out of the admin dashboard?"
        description="You'll need to log back in to manage products, orders, and users."
        confirmLabel="Logout"
        tone="danger"
        onConfirm={confirmLogout}
        onCancel={() => setLogoutOpen(false)}
      />
    </>
  );
}