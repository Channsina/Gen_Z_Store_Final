import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/useAuth";

export default function ProductCard({ product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const outOfStock = typeof product.stock === "number" && product.stock <= 0;
  const lowStock =
    typeof product.stock === "number" && product.stock > 0 && product.stock <= 5;

  // Add to Cart / Check Out require an account so orders can be tracked
  // against a customer. Guests get sent to login and back here after.
  const requireLogin = () => {
    navigate("/login", { state: { from: location.pathname + location.search } });
  };

  const handleAddToCart = () => {
    if (!user) {
      requireLogin();
      return;
    }
    addToCart(product, size);
  };

  const handleCheckOutClick = (e) => {
    e.preventDefault();
    if (outOfStock) return;
    if (!user) {
      requireLogin();
      return;
    }
    addToCart(product, size);
    navigate("/checkout");
  };

  return (
    <div className="max-w-sm lg:max-w-md bg-white rounded-3xl shadow-xl p-4 overflow-hidden transition-all duration-500 transform hover:translate-y-1 hover:shadow-purple-200 group animate-fadeUp">

      <div className="relative rounded-2xl overflow-hidden">
        <img src={product.image} alt={product.title} loading="lazy" className="w-full h-90 object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"/>
        {outOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold tracking-wide uppercase text-sm bg-red-600 px-4 py-1.5 rounded-full">
              Out of stock
            </span>
          </div>
        )}
        {!outOfStock && lowStock && (
          <span className="absolute top-3 left-3 text-[11px] font-700 uppercase bg-amber-500 text-white px-2.5 py-1 rounded-full shadow">
            Only {product.stock} left
          </span>
        )}
      </div>

      {/* Content */}
      <div className="px-2 pt-5 pb-3">
        <h2 className="text-2xl font-bold text-slate-900 line-clamp-1">{product.name}</h2>

        <p className="mt-2 text-slate-500 text-[15px] leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Size Options */}
        <div className="flex items-center flex-wrap text-gray-400 gap-2 mb-4 mt-4">
          {product.sizes.map((s) => (
            <button key={s} type="button"onClick={() => setSize(s)} className={`px-3 py-1 border rounded-2xl text-sm transition ${
                size === s
                  ? "bg-purple-600 border-purple-600 text-white"
                  : "border-purple-500 hover:bg-slate-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <hr className="mt-5 border-slate-200" />

        <p className="mt-4 text-2xl font-extrabold text-slate-900">${product.price}</p>

        {/* Buttons */}
        <div className="mt-5 flex gap-3">
          <Link to="/checkout" onClick={handleCheckOutClick} aria-disabled={outOfStock} className={`flex-1 border text-center font-semibold rounded-xl py-3 transition ${
              outOfStock
                ? "border-slate-200 text-slate-300 cursor-not-allowed pointer-events-none"
                : "border-slate-300 text-slate-700 hover:bg-slate-50"
            }`}>
            Check Out
          </Link>
          <button type="button" disabled={outOfStock} onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl py-3 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-purple-600">
            {outOfStock ? "Sold Out" : "Add to Cart"}
            {!outOfStock && (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L20.96 5H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            )}
          </button>
        </div>
        {!user && !outOfStock && (
          <p className="mt-2 text-xs text-slate-400 text-center">
            Log in to add items to your cart.
          </p>
        )}
      </div>
    </div>
  );
}
