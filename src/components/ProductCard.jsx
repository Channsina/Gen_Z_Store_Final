import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

export default function ProductCard({ product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const { addToCart } = useCart();

  return (
    <div className="max-w-sm lg:max-w-md bg-white rounded-3xl shadow-xl p-4 overflow-hidden transition-all duration-500 transform hover:translate-y-1 hover:shadow-purple-200 group animate-fadeUp">

      {/* Image */}
      <div className="relative rounded-2xl overflow-hidden">
        <img src={product.image} alt={product.title} loading="lazy" className="w-full h-90 object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"/>
      </div>

      {/* Content */}
      <div className="px-2 pt-5 pb-3">
        <h2 className="text-2xl font-bold text-slate-900 line-clamp-1">{product.title}</h2>

        <p className="mt-2 text-slate-500 text-[15px] leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Size Options */}
        <div className="flex items-center flex-wrap text-gray-400 gap-2 mb-4 mt-4">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`px-3 py-1 border rounded-2xl text-sm transition ${
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

        <p className="mt-4 text-2xl font-extrabold text-slate-900">{product.price}</p>

        {/* Buttons */}
        <div className="mt-5 flex gap-3">
          <Link
            to="/checkout"
            onClick={() => addToCart(product, size)}
            className="flex-1 border text-center border-slate-300 text-slate-700 font-semibold rounded-xl py-3 hover:bg-slate-50 transition">
            Check Out
          </Link>
          <button
            type="button"
            onClick={() => addToCart(product, size)}
            className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl py-3 transition"
          >
            Add to Cart
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L20.96 5H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
