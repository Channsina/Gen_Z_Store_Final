import { useState } from "react";
import {
  useProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../hooks/useProducts";
import Modal from "../components/Modal";
import { publicUrl } from "../lib/publicUrl";

const CATEGORIES = ["men", "women", "couple"];
const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];

const emptyForm = {
  name: "",
  description: "",
  price: "",
  image: "",
  category: "men",
  sizes: ["S", "M", "L"],
  stock: "",
  bestSeller: false,
};

export default function Products() {
  const { products, loading } = useProducts();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;
    setUploadError("");
    setUploading(true);
    try {
      const body = new FormData();
      body.append("image", file);
      const res = await fetch("/api/upload-product-image", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed.");
      setForm((f) => ({ ...f, image: data.path }));
    } catch (err) {
      console.error(err);
      setUploadError(
        err.message === "Failed to fetch"
          ? "Upload endpoint isn't available — this only works while running `npm run dev` locally."
          : err.message
      );
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setUploadError("");
  };

  const startEdit = (p) => {
    setForm({
      name: p.name || "",
      description: p.description || "",
      price: p.price ?? "",
      image: p.image || "",
      category: p.category || "men",
      sizes: p.sizes?.length ? p.sizes : ["S", "M", "L"],
      stock: p.stock ?? "",
      bestSeller: !!p.bestSeller,
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  const toggleSize = (size) => {
    setForm((f) => ({
      ...f,
      sizes: f.sizes.includes(size)
        ? f.sizes.filter((s) => s !== size)
        : [...f.sizes, size],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    setSaving(true);
    try {
      if (editingId) {
        await updateProduct(editingId, form);
      } else {
        await createProduct(form);
      }
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Something went wrong saving the product.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product? This can't be undone.")) return;
    try {
      await deleteProduct(id);
    } catch (err) {
      console.error(err);
      alert("Couldn't delete the product.");
    }
  };

  const visible = products
    .filter((p) => categoryFilter === "all" || p.category === categoryFilter)
    .filter((p) => p.name?.toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <div className="p-5 sm:p-8">

      {/* Search + category filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[220px]">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M18 11a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text"  value={search} onChange={(e) => setSearch(e.target.value)}  placeholder="Search products..." className="w-full rounded-xl border border-purple-200 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-purple-500 bg-white"/>
        </div>

        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-xl border border-purple-200 px-4 py-2.5 text-sm outline-none focus:border-purple-500 capitalize bg-white">
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c} className="capitalize">
              {c}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }} className="rounded-xl bg-purple-600 text-white font-600 px-5 py-2.5 hover:bg-purple-700 transition-colors cursor-pointer shrink-0">
          + Add Product
        </button>
      </div>

      {loading && <p className="text-black/50">Loading products…</p>}

      <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-black/50 text-left">
              <tr>
                <th className="px-5 py-3 font-600">Product</th>
                <th className="px-5 py-3 font-600">Category</th>
                <th className="px-5 py-3 font-600">Price</th>
                <th className="px-5 py-3 font-600">Stock</th>
                <th className="px-5 py-3 font-600 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((p) => (
                <tr key={p.id} className="border-t border-black/5">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {p.image && (
                        <img src={publicUrl(p.image)} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      )}
                      <span className="font-600 line-clamp-1">{p.name}</span>
                      {p.bestSeller && (
                        <span className="text-[10px] uppercase font-700 bg-pink-100 text-pink-600 rounded-full px-2 py-0.5">
                          Best seller
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3 capitalize">{p.category}</td>
                  <td className="px-5 py-3">${Number(p.price || 0).toFixed(2)}</td>
                  <td className="px-5 py-3">
                    <span className={p.stock <= 0 ? "text-red-600 font-600" : p.stock <= 5 ? "text-amber-600 font-600" : ""}>
                      {p.stock ?? 0}
                    </span>
                  </td>
                  <td className="grid grid-cols-2 px-5 py-3 text-center gap-2">
                    <button onClick={() => startEdit(p)} className="text-purple-700 cursor-pointer px-2 py-2 bg-purple-100 hover:bg-purple-200 rounded-xl">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 cursor-pointer px-2 py-2 bg-red-100 rounded-xl hover:bg-red-200">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && visible.length === 0 && (
          <p className="text-black/50 text-center py-10">No products found.</p>
        )}
      </div>

      <Modal open={showForm} onClose={resetForm} title={editingId ? "Edit product" : "New product"}>
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-600 mb-1 block">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-xl border border-black/15 px-4 py-2.5 outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-sm font-600 mb-1 block">Price (USD)</label>
            <input
              required
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              className="w-full rounded-xl border border-black/15 px-4 py-2.5 outline-none focus:border-purple-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm font-600 mb-1 block">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full rounded-xl border border-black/15 px-4 py-2.5 outline-none focus:border-purple-500 resize-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm font-600 mb-1 block">Product image</label>
            <label className="group flex items-center gap-4 rounded-2xl border-2 border-dashed border-black/15 p-4 cursor-pointer hover:border-purple-400 transition-colors">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
              />
              {form.image ? (
                <img src={publicUrl(form.image)} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-black/10 shrink-0" />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-black/30 shrink-0">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 8h16M4 4h16v16H4V4z" />
                  </svg>
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-600 text-black/70 group-hover:text-purple-700">
                  {uploading ? "Uploading…" : form.image ? "Change image" : "Click to upload an image"}
                </p>
                <p className="text-xs text-black/40 mt-0.5">JPG, PNG, WEBP or GIF</p>
                {uploadError && <p className="text-xs text-red-600 mt-1">{uploadError}</p>}
              </div>
            </label>
          </div>

          <div>
            <label className="text-sm font-600 mb-1 block">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full rounded-xl border border-black/15 px-4 py-2.5 outline-none focus:border-purple-500 capitalize">
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="capitalize">
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-600 mb-1 block">Stock quantity</label>
            <input
              required
              type="number"
              min="0"
              value={form.stock}
              onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
              className="w-full rounded-xl border border-black/15 px-4 py-2.5 outline-none focus:border-purple-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm font-600 mb-2 block">Available sizes</label>
            <div className="flex flex-wrap gap-2">
              {SIZE_OPTIONS.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => toggleSize(s)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    form.sizes.includes(s)
                      ? "bg-purple-600 text-white border-purple-600"
                      : "border-black/20 text-black/60 hover:border-purple-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 sm:col-span-2">
            <input
              type="checkbox"
              checked={form.bestSeller}
              onChange={(e) => setForm((f) => ({ ...f, bestSeller: e.target.checked }))}
              className="w-4 h-4 rounded border-black/20 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-sm">Mark as best seller (shown on homepage)</span>
          </label>

          <div className="sm:col-span-2 flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-purple-600 text-white font-600 px-6 py-2.5 hover:bg-purple-700 transition-colors disabled:opacity-60 cursor-pointer"
            >
              {saving ? "Saving..." : editingId ? "Save changes" : "Create product"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-purple-200 font-600 px-6 py-2.5 hover:bg-black/5 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}