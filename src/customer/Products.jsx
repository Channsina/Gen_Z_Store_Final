import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts, getProductsByCategory } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

const tabs = [
  { label: "All Style", value: "all" },
  { label: "Men's Style", value: "men" },
  { label: "Women's Style", value: "women" },
  { label: "Couple's Style", value: "couple" },
];

// Hero image/heading per category, same data as the old heroImages object
const heroImages = {
  men: {
    src: "/images/heroImage/men.png",
    alt: "Men Style Hero",
    heading: "DISCOVER MEN STYLE HERE WITH",
  },
  women: {
    src: "/images/heroImages/women.png",
    alt: "Women Style Hero",
    heading: "DISCOVER WOMEN STYLE HERE WITH",
  },
  couple: {
    src: "/images/heroImages/couple.png",
    alt: "Couple Style Hero",
    heading: "DISCOVER COUPLE STYLE HERE WITH",
  },
  all: {
    src: "/images/heroImages/all.png",
    alt: "Premium Products",
    heading: "DISCOVER ALL STYLE HERE WITH",
  },
};

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";
  const [searchTerm, setSearchTerm] = useState("");
  const { products, loading } = useProducts();

  const hero = heroImages[category] || heroImages.all;

  const list = useMemo(() => {
    const byCategory = getProductsByCategory(products, category);
    const term = searchTerm.trim().toLowerCase();
    if (!term) return byCategory;
    return byCategory.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
    );
  }, [products, category, searchTerm]);

  return (
    <div>
      {/* Hero - now swaps image/heading based on the selected category */}
      <section className="relative mx-auto max-w-7xl overflow-hidden p-5 mt-3">
        <img src={hero.src} alt={hero.alt} className="w-full h-32 md:h-70 lg:h-92 shadow-lg rounded-3xl object-cover object-center"/>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <h1 className="text-white text-lg md:text-4xl lg:text-5xl font-extrabold text-center mb-2 drop-shadow-lg leading-tight">
            {hero.heading}
            <br />
            <span className="text-pink-600">PREMIUM PRODUCTS</span>
          </h1>
        </div>
      </section>

      <section className="container-page py-12">
        <h2 className="font-black text-3xl mb-6 text-purple-800">OUR PRODUCTS</h2>

        {/* Search + category filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search products..." className="w-full rounded-xl bg-white border border-purple-200 shadow-sm pl-10 pr-10 py-3 text-sm outline-none focus:border-purple-800 transition-colors"/>
            {searchTerm && (
              <button type="button" onClick={() => setSearchTerm("")} aria-label="Clear search" className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-ink">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className="relative sm:w-48">
            <select
              value={category}
              onChange={(e) =>
                setSearchParams(e.target.value === "all" ? {} : { category: e.target.value })
              } className="w-full appearance-none rounded-xl bg-white border border-purple-200 shadow-sm pl-5 pr-10 py-3 text-sm outline-none focus:border-purple-800 transition-colors cursor-pointer">
              {tabs.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            
            <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 lg:gap-3">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {!loading && list.length === 0 && (
          <p className="text-gray-400 text-center py-16">
            {searchTerm
              ? `No products match "${searchTerm}".`
              : "No products found in this category yet."}
          </p>
        )}
      </section>
    </div>
  );
}
