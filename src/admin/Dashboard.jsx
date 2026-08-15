import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebaseClient";
import { STATUS_STYLES, statusLabel } from "../data/orderStatus";

function formatDate(ts) {
  if (!ts) return "Just now";
  try {
    return ts.toDate().toLocaleString();
  } catch {
    return "";
  }
}

function StatCard({ label, value, sub, accent }) {
  return (
    <div className="bg-white rounded-2xl shadow border border-black/10 p-5">
      <p className="text-sm text-black/50">{label}</p>
      <p className={`text-3xl font-800 font-display mt-1 ${accent || ""}`}>{value}</p>
      {sub && <p className="text-xs text-black/40 mt-1">{sub}</p>}
    </div>
  );
}

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubs = [
      onSnapshot(query(collection(db, "orders"), orderBy("createdAt", "desc")), (s) =>
        setOrders(s.docs.map((d) => ({ id: d.id, ...d.data() })))
      ),
      onSnapshot(collection(db, "products"), (s) =>
        setProducts(s.docs.map((d) => ({ id: d.id, ...d.data() })))
      ),
      onSnapshot(collection(db, "users"), (s) =>
        setUsers(s.docs.map((d) => ({ id: d.id, ...d.data() })))
      ),
      onSnapshot(
        query(collection(db, "contact_messages"), orderBy("createdAt", "desc")),
        (s) => {
          setMessages(s.docs.map((d) => ({ id: d.id, ...d.data() })));
          setLoading(false);
        }
      ),
    ];
    return () => unsubs.forEach((u) => u());
  }, []);

  const revenue = orders.reduce((sum, o) => sum + (o.subtotal || 0), 0);
  const unreadMessages = messages.filter((m) => !m.read).length;
  const lowStock = products.filter((p) => (p.stock ?? 0) <= 5);
  const pendingOrders = orders.filter((o) => (o.status || "pending") === "pending").length;

  return (
    <div className="p-5 sm:p-8">

      {loading ? (
        <p className="text-black/50">Loading…</p>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Revenue" value={`$${revenue.toFixed(2)}`} sub={`${orders.length} orders`} accent="text-purple-700" />
            <StatCard label="Pending Orders" value={pendingOrders} sub="Need action" accent="text-amber-600" />
            <StatCard label="Products" value={products.length} sub={`${lowStock.length} low on stock`} accent="text-indigo-700" />
            <StatCard label="Registered Users" value={users.length} sub={`${users.filter((u) => u.role === "admin").length} admins`} accent="text-pink-600" />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent orders */}
            <div className="lg:col-span-2 bg-white shadow rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-700 text-lg">Recent Orders</h2>
                <Link to="/dashboard/orders" className="text-sm text-purple-700/50 hover:text-purple-700">
                  View all
                </Link>
              </div>
              {orders.length === 0 && <p className="text-black/50 text-sm">No orders yet.</p>}
              <div className="space-y-3">
                {orders.slice(0, 6).map((o) => (
                  <div key={o.id} className="flex items-center justify-between gap-3 border-b border-black/5 pb-3 last:border-0 last:pb-0">
                    <div className="min-w-0">
                      <p className="font-600 text-sm truncate">{o.customer?.name || "Guest"}</p>
                      <p className="text-xs text-black/40">{formatDate(o.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm font-700">${(o.subtotal || 0).toFixed(2)}</span>
                      <span className={`text-[11px] font-600 px-2.5 py-1 rounded-xl border ${STATUS_STYLES[o.status] || STATUS_STYLES.pending}`}>
                        {statusLabel(o.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-700 text-lg">Messages</h2>
                  <Link to="/dashboard/messages" className="text-sm text-purple-700/50 hover:text-purple-700">
                    View all
                  </Link>
                </div>
                <p className="text-3xl font-800">{unreadMessages}</p>
                <p className="text-black/50 text-sm">unread contact messages</p>
              </div>

              <div className="bg-white rounded-xl shadow p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-700 text-lg">Low Stock</h2>
                  <Link to="/dashboard/stock" className="text-sm text-purple-700/50 hover:text-purple-700">
                    Manage
                  </Link>
                </div>
                {lowStock.length === 0 && <p className="text-black/50 text-sm">All products well stocked.</p>}
                <div className="space-y-2">
                  {lowStock.slice(0, 5).map((p) => (
                    <div key={p.id} className="flex items-center justify-between text-sm">
                      <span className="truncate">{p.name}</span>
                      <span className={`font-700 ${p.stock <= 0 ? "text-red-600" : "text-amber-600"}`}>
                        {p.stock <= 0 ? "Out" : p.stock}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}