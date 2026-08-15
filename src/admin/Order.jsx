import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebaseClient";
import { ORDER_STATUSES, STATUS_STYLES, statusLabel } from "../data/orderStatus";

function formatDate(ts) {
  if (!ts) return "Just now";
  try {
    return ts.toDate().toLocaleString();
  } catch {
    return "";
  }
}

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setOrders(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const setStatus = (id, status) =>
    updateDoc(doc(db, "orders", id), { status });

  const remove = (id) => {
    if (confirm("Delete this order? This can't be undone.")) {
      deleteDoc(doc(db, "orders", id));
    }
  };

  const visible = orders
    .filter((o) => statusFilter === "all" || (o.status || "pending") === statusFilter)
    .filter((o) =>
      `${o.customer?.name || ""} ${o.customer?.email || ""}`
        .toLowerCase()
        .includes(search.trim().toLowerCase())
    );

  return (
    <div className="p-5 sm:p-8">

      {/* Search + status filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[220px]">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M18 11a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name or email..."
            className="w-full rounded-xl border border-purple-200 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-purple-500 bg-white"/>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-purple-200 px-4 py-2.5 text-sm outline-none focus:border-purple-500 capitalize bg-white">
          <option value="all">All statuses</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s} className="capitalize">
              {statusLabel(s)}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-black/50">Loading orders…</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && visible.length === 0 && <p className="text-black/50">No orders here.</p>}

      <div className="space-y-4">
        {visible.map((o) => {
          const isOpen = expanded === o.id;
          return (
            <div key={o.id} className="bg-white rounded-2xl border border-black/10 overflow-hidden">
              <button type="button" onClick={() => setExpanded(isOpen ? null : o.id)} className="w-full flex flex-wrap items-center justify-between gap-3 p-5 text-left cursor-pointer">
                <div className="min-w-0">
                  <p className="font-700 truncate">{o.customer?.name || "Guest"}</p>
                  <p className="text-xs text-black/40">
                    {o.customer?.email} · {formatDate(o.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-700">${(o.subtotal || 0).toFixed(2)}</span>
                  <span className={`text-[11px] font-600 px-2.5 py-1 rounded-full border capitalize ${
                      STATUS_STYLES[o.status] || STATUS_STYLES.pending
                    }`}
                  >
                    {statusLabel(o.status)}
                  </span>
                  <svg className={`w-4 h-4 text-black/40 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-black/10 p-5 bg-gray-50/60">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-700 mb-2">Shipping details</h3>
                      <p className="text-sm text-black/70">{o.customer?.name}</p>
                      <p className="text-sm text-black/70">{o.customer?.email}</p>
                      <p className="text-sm text-black/70 whitespace-pre-wrap">{o.customer?.address}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-700 mb-2">Items</h3>
                      <div className="space-y-2">
                        {(o.items || []).map((it) => (
                          <div key={it.key} className="flex justify-between text-sm">
                            <span className="text-black/70">
                              {it.name} × {it.qty}{" "}
                              <span className="text-black/40">({it.size})</span>
                            </span>
                            <span className="font-600">${(it.price * it.qty).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-black/10">
                    <label className="text-sm font-600 text-black/60">Update status:</label>
                    <select value={o.status || "pending"} onChange={(e) => setStatus(o.id, e.target.value)} className="rounded-xl border border-black/15 px-3 py-2 text-sm capitalize outline-none focus:border-purple-500">
                      {ORDER_STATUSES.map((s) => (
                        <option key={s} value={s} className="capitalize">
                          {statusLabel(s)}
                        </option>
                      ))}
                    </select>
                    <button onClick={() => remove(o.id)} className="ml-auto text-sm text-red-500 hover:underline cursor-pointer">
                      Delete order
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}