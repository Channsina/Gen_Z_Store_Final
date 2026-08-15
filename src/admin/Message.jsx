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

function formatDate(ts) {
  if (!ts) return "Just now";
  try {
    return ts.toDate().toLocaleString();
  } catch {
    return "";
  }
}

export default function Message() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); 
  const [search, setSearch] = useState("");

  useEffect(() => {
    const q = query(collection(db, "contact_messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setMessages(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
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

  const markRead = (id, read) =>
    updateDoc(doc(db, "contact_messages", id), { read: !read });

  const remove = (id) => {
    if (confirm("Delete this message?")) {
      deleteDoc(doc(db, "contact_messages", id));
    }
  };

  const visible = messages
    .filter((m) => {
      if (filter === "unread") return !m.read;
      if (filter === "read") return !!m.read;
      return true;
    })
    .filter((m) =>
      `${m.name || ""} ${m.email || ""} ${m.message || ""}`
        .toLowerCase()
        .includes(search.trim().toLowerCase())
    );

  return (
    <div className="p-5 sm:p-8">

      {/* Search + read-status filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[220px]">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M18 11a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or message..."
            className="w-full rounded-xl border border-purple-200 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-purple-500 bg-white"
          />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border border-purple-200 px-4 py-2.5 text-sm outline-none focus:border-purple-500 bg-white">
          <option value="all">All messages</option>
          <option value="unread">Unread only</option>
          <option value="read">Read only</option>
        </select>
      </div>

      {loading && <p className="text-black/50">Loading messages…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && visible.length === 0 && (
        <p className="text-black/50">No messages here.</p>
      )}

      <div className="space-y-4">
        {visible.map((m) => (
          <div key={m.id}
            className={`rounded-2xl p-5 border ${
              m.read ? "border-black/10 bg-white" : "border-purple-200 bg-white"
            }`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-700">
                  {m.name}{" "}
                  {!m.read && (
                    <span className="ml-2 text-[10px] uppercase font-700 bg-purple-600 text-white rounded-full px-2 py-0.5 align-middle">
                      New
                    </span>
                  )}
                </p>
                <p className="text-sm text-purple-700">{m.email}</p>
              </div>
              <span className="text-xs text-black/40">{formatDate(m.createdAt)}</span>
            </div>
            <p className="text-black/70 mt-3 whitespace-pre-wrap">{m.message}</p>
            <div className="flex gap-3 mt-4 text-xs">
              <button onClick={() => markRead(m.id, m.read)} className="text-purple-700 border-0 bg-purple-50 hover:bg-purple-100 h rounded-xl px-4 py-3 cursor-pointer">
                Mark as {m.read ? "unread" : "read"}
              </button>
              <button onClick={() => remove(m.id)} className="text-red-500 bg-red-50 hover:bg-red-100 border-0 px-4 py-3 rounded-xl cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}