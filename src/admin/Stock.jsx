import { useState } from "react";
import { useProducts, updateStock } from "../hooks/useProducts";
import { publicUrl } from "../lib/publicUrl";

export default function Stock() {
  const { products, loading } = useProducts();
  const [drafts, setDrafts] = useState({});
  const [saving, setSaving] = useState(null);
  const [filter, setFilter] = useState("all"); // all | low | out
  const [search, setSearch] = useState("");

  const getValue = (p) => (drafts[p.id] ?? p.stock ?? 0);

  const setDraft = (id, value) => setDrafts((d) => ({ ...d, [id]: value }));

  const adjust = (p, delta) => {
    const next = Math.max(0, Number(getValue(p)) + delta);
    setDraft(p.id, next);
  };

  const save = async (p) => {
    setSaving(p.id);
    try {
      await updateStock(p.id, getValue(p));
      setDrafts((d) => {
        const next = { ...d };
        delete next[p.id];
        return next;
      });
    } catch (err) {
      console.error(err);
      alert("Couldn't update stock.");
    } finally {
      setSaving(null);
    }
  };

  const visible = products
    .filter((p) => p.name?.toLowerCase().includes(search.trim().toLowerCase()))
    .filter((p) => {
      if (filter === "low") return (p.stock ?? 0) > 0 && (p.stock ?? 0) <= 5;
      if (filter === "out") return (p.stock ?? 0) <= 0;
      return true;
    });

  return (
    <div className="p-5 sm:p-8">

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[220px]">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M18 11a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-purple-200 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-purple-500 bg-white"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-purple-200 px-4 py-2.5 text-sm outline-none focus:border-purple-500 bg-white"
        >
          <option value="all">All stock levels</option>
          <option value="low">Low stock</option>
          <option value="out">Out of stock</option>
        </select>
      </div>

      {loading && <p className="text-black/50">Loading stock…</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((p) => {
          const value = getValue(p);
          const dirty = drafts[p.id] !== undefined && Number(drafts[p.id]) !== (p.stock ?? 0);
          const status = value <= 0 ? "Out of stock" : value <= 5 ? "Low stock" : "In stock";
          const statusColor =
            value <= 0 ? "text-red-600" : value <= 5 ? "text-amber-600" : "text-green-600";

          return (
            <div key={p.id} className="bg-white rounded-2xl border border-black/10 p-4">
              <div className="flex items-center gap-3 mb-3">
                {p.image && (
                  <img src={publicUrl(p.image)} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                )}
                <div className="min-w-0">
                  <p className="font-600 truncate">{p.name}</p>
                  <p className={`text-xs font-600 ${statusColor}`}>{status}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => adjust(p, -1)}
                  className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 cursor-pointer"
                >
                  −
                </button>
                <input
                  type="number"
                  min="0"
                  value={value}
                  onChange={(e) => setDraft(p.id, e.target.value)}
                  className="w-full text-center rounded-xl border border-black/15 px-2 py-1.5 outline-none focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={() => adjust(p, 1)}
                  className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                disabled={!dirty || saving === p.id}
                onClick={() => save(p)}
                className="w-full mt-3 rounded-xl bg-purple-600 text-white font-600 py-2 text-sm hover:bg-purple-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {saving === p.id ? "Saving..." : "Update stock"}
              </button>
            </div>
          );
        })}
      </div>

      {!loading && visible.length === 0 && (
        <p className="text-black/50 text-center py-16">No products match this filter.</p>
      )}
    </div>
  );
}