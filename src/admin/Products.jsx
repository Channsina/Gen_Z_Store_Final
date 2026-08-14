import { useSearchParams } from "react-router-dom";
import { getProductsByCategory } from "../data/products";
import ProductCard from "../components/ProductCard";

const tabs = [
  { label: "All Style", value: "all" },
  { label: "Men's Style", value: "men" },
  { label: "Women's Style", value: "women" },
  { label: "Couple's Style", value: "couple" },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";
  const list = getProductsByCategory(category);

  return (
    <div>
      <section className="relative">
        <div className="h-56 sm:h-72 w-full overflow-hidden">
          <img
            src="https://www.stylumia.ai/wp-content/uploads/2023/09/Gen-Z-Style-Signals-Square-min.png"
            alt="cover all product"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="container-page text-white">
              <h1 className="font-display font-800 text-2xl sm:text-4xl max-w-lg">
                DISCOVER ALL STYLE HERE WITH PREMIUM PRODUCTS
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <h2 className="font-display font-700 text-3xl mb-6">Our Products</h2>

        <div className="flex flex-wrap gap-3 mb-10">
          {tabs.map((t) => (
            <button
              key={t.value}
              onClick={() =>
                setSearchParams(t.value === "all" ? {} : { category: t.value })
              }
              className={`rounded-full px-5 py-2 text-sm font-600 border transition-colors ${
                category === t.value
                  ? "bg-ink text-white border-ink"
                  : "border-black/20 text-black/60 hover:border-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {list.length === 0 && (
          <p className="text-black/50 text-center py-16">
            No products found in this category yet.
          </p>
        )}
      </section>
    </div>
  );
}
