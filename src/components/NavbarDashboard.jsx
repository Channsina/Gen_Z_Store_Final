import { useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const TITLES = [
  { path: "/dashboard/orders", title: "Orders" },
  { path: "/dashboard/products", title: "Products" },
  { path: "/dashboard/stock", title: "Stock" },
  { path: "/dashboard/messages", title: "Messages" },
  { path: "/dashboard/users", title: "Users" },
  { path: "/dashboard", title: "Overview" },
];

function getTitle(pathname) {
  const match = TITLES.find((t) => pathname.startsWith(t.path));
  return match?.title || "Dashboard";
}

export default function Navbar({ onMenuClick }) {
  const location = useLocation();
  const { profile, user } = useAuth();
  const displayName = profile?.fullName || user?.displayName || user?.email || "Admin";
  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-black/10">
      <div className="flex items-center gap-3 px-4 sm:px-6 py-3.5">
        <button type="button"
          onClick={onMenuClick} aria-label="Open menu"className="md:hidden -ml-1 w-9 h-9 rounded-full flex items-center justify-center text-black/60 hover:bg-black/5 transition-colors cursor-pointer shrink-0">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="min-w-0">
          <h1 className=" font-bold font-700 text-lg sm:text-xl truncate leading-tight">
            {getTitle(location.pathname)}
          </h1>
          <p className="hidden sm:block text-xs text-black/40">GenZ Store admin dashboard</p>
        </div>

        <div className="ml-auto flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex flex-col items-end leading-tight">
            <span className="text-sm font-600 truncate max-w-[160px]">{displayName}</span>
            <span className="text-[11px] text-black/40">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}