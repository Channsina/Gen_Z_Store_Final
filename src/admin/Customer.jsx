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

function formatDate(ts) {
  if (!ts) return "—";
  try {
    return ts.toDate().toLocaleDateString();
  } catch {
    return "";
  }
}

export default function Customer() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    let q;
    try {
      q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    } catch {
      q = collection(db, "users");
    }
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const toggleRole = async (u) => {
    const nextRole = u.role === "admin" ? "customer" : "admin";
    if (
      !confirm(
        `Change ${u.fullName || u.email}'s role to "${nextRole}"?`
      )
    )
      return;
    await updateDoc(doc(db, "users", u.id), { role: nextRole });
  };

  const removeUser = async (u) => {
    if (u.id === currentUser?.uid) {
      alert("You can't remove your own account.");
      return;
    }
    if (
      !confirm(
        `Remove ${u.fullName || u.email} from Firestore? This does not delete their login — use Firebase Authentication console for that.`
      )
    )
      return;
    await deleteDoc(doc(db, "users", u.id));
  };

  const visible = users
    .filter((u) => roleFilter === "all" || u.role === roleFilter)
    .filter((u) =>
      `${u.fullName || ""} ${u.email || ""}`.toLowerCase().includes(search.trim().toLowerCase())
    );

  return (
    <div className="p-5 sm:p-8">
      {/* Search + role filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[220px]">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M18 11a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name or email..."
            className="w-full rounded-xl border border-purple-200 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-purple-500 bg-white"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-xl border border-purple-200 px-4 py-2.5 text-sm outline-none focus:border-purple-500 capitalize bg-white"
        >
          <option value="all">All roles</option>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {loading && <p className="text-black/50">Loading users…</p>}

      <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-black/50 text-left">
              <tr>
                <th className="px-5 py-3 font-600">Name</th>
                <th className="px-5 py-3 font-600 ">Email</th>
                <th className="px-5 py-3 font-600 text-center">Role</th>
                <th className="px-5 py-3 font-600 ">Joined</th>
                <th className="px-5 py-3 font-600 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((u) => (
                <tr key={u.id} className="border-t border-black/5">
                  <td className="px-5 py-3 font-600">
                    {u.fullName || "—"}
                    {u.id === currentUser?.uid && (
                      <span className="ml-2 text-[10px] uppercase font-700 bg-purple-100 text-purple-600 rounded-full px-2 py-0.5">
                        You
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3">{u.email}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-[11px] grid grid-cols-1 font-600 px-2 py-2 rounded-xl text-center border capitalize ${
                        u.role === "admin"
                          ? "bg-purple-100 text-purple-700 border-purple-200"
                          : "bg-gray-100 text-gray-600 border-gray-200"
                      }`}
                    >
                      {u.role || "customer"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-black/50">{formatDate(u.createdAt)}</td>
                  <td className="grid grid-cols-2 px-5 py-3 text-center gap-2">
                    <button onClick={() => toggleRole(u)} className="text-purple-700 px-2 py-2 bg-purple-100 hover:bg-purple-200 rounded-xl cursor-pointer">
                      Make {u.role === "admin" ? "customer" : "admin"}
                    </button>
                    <button onClick={() => removeUser(u)} className="text-red-500 px-2 py-2 bg-red-100 hover:bg-red-200 rounded-xl cursor-pointer">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && visible.length === 0 && (
          <p className="text-black/50 text-center py-10">No users found.</p>
        )}
      </div>
    </div>
  );
}