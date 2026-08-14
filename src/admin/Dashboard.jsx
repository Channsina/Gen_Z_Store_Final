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
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";

function formatDate(ts) {
  if (!ts) return "Just now";
  try {
    return ts.toDate().toLocaleString();
  } catch {
    return "";
  }
}

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "contact_messages"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setMessages(
          snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
        );
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [user]);

  const markRead = (id, read) =>
    updateDoc(doc(db, "contact_messages", id), { read: !read });

  const remove = (id) => {
    if (confirm("Delete this message?")) {
      deleteDoc(doc(db, "contact_messages", id));
    }
  };

  if (authLoading) return null;

  if (!user) {
    return (
      <div className="container-page py-24 text-center max-w-md mx-auto">
        <h1 className="font-display font-800 text-3xl mb-3">
          Dashboard access
        </h1>
        <p className="text-black/60 mb-6">
          Log in to view messages submitted through the contact form.
        </p>
        <Link
          to="/login"
          className="inline-block rounded-full bg-purple-600 text-white font-600 px-6 py-3 hover:bg-indigo-600 transition-colors"
        >
          Log in
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-14">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-800 text-3xl">Contact Messages</h1>
          <p className="text-black/50 text-sm mt-1">
            {messages.length} message{messages.length !== 1 ? "s" : ""} from
            the GenZ Store contact form
          </p>
        </div>
      </div>

      {loading && <p className="text-black/50">Loading messages…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && messages.length === 0 && (
        <p className="text-black/50">No messages yet.</p>
      )}

      <div className="space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`rounded-2xl border p-5 ${
              m.read ? "border-black/10 bg-white" : "border-purple-300 bg-purple-50/40"
            }`}
          >
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
              <span className="text-xs text-black/40">
                {formatDate(m.createdAt)}
              </span>
            </div>
            <p className="text-black/70 mt-3 whitespace-pre-wrap">
              {m.message}
            </p>
            <div className="flex gap-4 mt-4 text-xs font-600">
              <button
                onClick={() => markRead(m.id, m.read)}
                className="text-purple-700 hover:underline"
              >
                Mark as {m.read ? "unread" : "read"}
              </button>
              <button
                onClick={() => remove(m.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
