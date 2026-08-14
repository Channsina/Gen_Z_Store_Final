import { useState } from "react";
import { useAuth } from "../context/useAuth";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const displayName = user?.displayName || user?.email?.split("@")[0];

    const handleLogout = () => {
        setMenuOpen(false);
        logout();
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
                    <a href="/checkout">
                        <svg className="w-10 h-10 bg-purple-100 rounded-lg p-2 shadow hover:bg-purple-200 text-purple-700" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L20.96 5H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                    </a>

                    {user ? (
                        <div className="flex items-center space-x-3">
                            <span className="text-purple-700 font-medium whitespace-nowrap">
                                Hi, {displayName}
                            </span>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="h-10 flex text-white rounded-2xl shadow bg-purple-600 hover:bg-purple-700 items-center px-5 whitespace-nowrap cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <a href="/login" className="h-10 flex text-white rounded-2xl shadow bg-purple-600 hover:bg-purple-700 items-center px-5 whitespace-nowrap">
                            Login
                        </a>
                    )}
                </div>

                {/* Mobile */}
                <div className="flex md:hidden items-center space-x-3">
                    <a href="/checkout">
                        <svg className="w-9 h-9 bg-purple-100 rounded-lg p-2 text-purple-700 shadow" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L20.96 5H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                    </a>

                    {user ? (
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="h-9 w-full shadow px-4 flex text-white rounded-xl bg-purple-600 hover:bg-purple-700 items-center justify-center cursor-pointer whitespace-nowrap"
                        >
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
                        <a href="/product" className="hover:text-purple-600">Products</a>
                        <a href="/about" className="hover:text-purple-600">About</a>
                        <a href="/contact" className="hover:text-purple-600">Contact</a>
                    </div>
                    )}
                </div>
                </div>
            </div>
        </nav>
    );
}
