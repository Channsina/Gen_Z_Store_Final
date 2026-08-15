import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useCart } from "../context/useCart";
import { useToast } from "../context/useToast";
import ConfirmDialog from "./ConfirmDialog";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);
    const { user, isAdmin, logout } = useAuth();
    const { count, clearCart } = useCart();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const displayName = user?.displayName || user?.email?.split("@")[0];

    const handleLogoutClick = () => {
        setMenuOpen(false);
        setAccountOpen(false);
        setLogoutOpen(true);
    };

    const confirmLogout = async () => {
        setLogoutOpen(false);
        try {
            await logout();
            clearCart();
            showToast("You've been logged out.", { tone: "success" });
            navigate("/");
        } catch (err) {
            console.error("Logout failed:", err);
            showToast("Logout failed. Please try again.", { tone: "error" });
        }
    };

    // The cart requires an account (see ProductCard), so guests get sent to
    // login instead of an empty/blocked checkout page.
    const handleCartClick = (e) => {
        e.preventDefault();
        setMenuOpen(false);
        if (!user) {
            navigate("/login", { state: { from: "/checkout" } });
            return;
        }
        navigate("/checkout");
    };

    return (
        <nav className="bg-gray-100 sticky text-black/50 shadow p-4 relative">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                <div className="text-xl text-purple-700 font-bold">GenZ Store</div>

                {/* Desktop links */}
                <div className="hidden md:flex items-center space-x-5">
                    <a href="/" className="hover:text-purple-600">Home</a>
                    <a href="/products" className="hover:text-purple-600">Products</a>
                    <a href="/about" className="hover:text-purple-600">About</a>
                    <a href="/contact" className="hover:text-purple-600">Contact</a>
                </div>

                {/* Desktop right side */}
                <div className="hidden md:flex items-center space-x-4">
                    <a href="/checkout" onClick={handleCartClick} className="relative" aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}>
                        <svg className="w-10 h-10 bg-purple-100 rounded-lg p-2 shadow hover:bg-purple-200 text-purple-700" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L20.96 5H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                        {user && count > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-pink-500 text-white text-[11px] font-bold flex items-center justify-center shadow">
                                {count > 99 ? "99+" : count}
                            </span>
                        )}
                    </a>

                    {user ? (
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setAccountOpen((prev) => !prev)}
                                aria-expanded={accountOpen}
                                className="flex items-center gap-2 h-10 rounded-2xl shadow bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 cursor-pointer"
                            >
                                <span className="font-medium whitespace-nowrap">Hi, {displayName}</span>
                                <svg className={`w-4 h-4 transition-transform ${accountOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {accountOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-black/10 py-2 z-20">
                                    {isAdmin && (
                                        <a href="/dashboard" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-sm text-purple-700 hover:bg-purple-50">
                                            Admin Dashboard
                                        </a>
                                    )}
                                    <a href="/checkout" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                                        My Cart
                                    </a>
                                    <button
                                        type="button"
                                        onClick={handleLogoutClick}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <a href="/login" className="h-10 flex text-white rounded-2xl shadow bg-purple-600 hover:bg-purple-700 items-center px-5 whitespace-nowrap">
                            Login
                        </a>
                    )}
                </div>

                {/* Mobile */}
                <div className="flex md:hidden items-center space-x-3">
                    <a href="/checkout" onClick={handleCartClick} className="relative" aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}>
                        <svg className="w-9 h-9 bg-purple-100 rounded-lg p-2 text-purple-700 shadow" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L20.96 5H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                        {user && count > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center shadow">
                                {count > 99 ? "99+" : count}
                            </span>
                        )}
                    </a>

                    {user ? (
                        <button type="button" onClick={handleLogoutClick} className="h-9 w-full shadow px-4 flex text-white rounded-xl bg-purple-600 hover:bg-purple-700 items-center justify-center cursor-pointer whitespace-nowrap">
                            Logout
                        </button>
                    ) : (
                        <a href="/login" className="h-9 w-full shadow px-4 flex text-white rounded-xl bg-purple-600 hover:bg-purple-700 items-center justify-center">
                            Login
                        </a>
                    )}

                    <button type="button" onClick={() => setMenuOpen((prev) => !prev)} className="text-purple-700 cursor-pointer" aria-label="Toggle menu" aria-expanded={menuOpen}>
                    {menuOpen ? (
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                    </button>

                    {/* Mobile dropdown menu */}
                    {menuOpen && (
                    <div className="flex md:hidden peer-checked:flex absolute top-full left-0 w-full bg-gray-100 flex-col space-y-3 p-4 shadow-md z-10">
                        {user && (
                            <span className="text-purple-700 font-medium">
                                Hi, {displayName}
                            </span>
                        )}
                        <a href="/" className="hover:text-purple-600">Home</a>
                        <a href="/products" className="hover:text-purple-600">Products</a>
                        <a href="/about" className="hover:text-purple-600">About</a>
                        <a href="/contact" className="hover:text-purple-600">Contact</a>
                        {isAdmin && (
                            <a href="/dashboard" className="hover:text-purple-600">Admin Dashboard</a>
                        )}
                    </div>
                    )}
                </div>
                </div>
            </div>

            <ConfirmDialog
                open={logoutOpen}
                title="Log out of GenZ Store?"
                description="You'll need to log in again to add items to your cart or check out."
                confirmLabel="Logout"
                tone="danger"
                onConfirm={confirmLogout}
                onCancel={() => setLogoutOpen(false)}/>
        </nav>
    );
}
