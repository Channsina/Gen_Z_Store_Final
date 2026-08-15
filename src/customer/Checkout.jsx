import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebaseClient";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/useAuth";

export default function Checkout() {
  const { items, subtotal, updateQty, removeFromCart, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    address: "",
  });
  const [status, setStatus] = useState("idle"); // idle | placing | placed | error 
  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    setStatus("placing");
    try {
      const orderPayload = {
        userId: user?.uid || null,
        customer: form,
        items,
        subtotal,
        status: "pending",
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, "orders"), orderPayload);
      clearCart();
      setStatus("placed");
      setForm((f) => ({ ...f, address: "" }));
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (!authLoading && !user) {
    return (
      <div className="container-page py-24 text-center max-w-md mx-auto">
        <h1 className="font-display font-800 text-3xl mb-3">Log in to check out</h1>
        <p className="text-black/60 mb-8">
          Create a free account or log in so we can save your order and let
          you track it.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate("/login", { state: { from: "/checkout" } })} className="rounded-full bg-purple-600 text-white font-600 px-6 py-3 hover:bg-indigo-600 transition-colors">
            Log in
          </button>
          <button onClick={() => navigate("/register", { state: { from: "/checkout" } })} className="rounded-full border border-black/15 font-600 px-6 py-3 hover:bg-black/5 transition-colors">
            Sign up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-14">
      <h1 className="font-bold text-3xl mb-10 text-purple-800">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Cart items */}
        <div className="md:col-span-2 space-y-5 bg-white shadow rounded-xl p-4">
          {items.length === 0 && (
              <div className="bg-gray-100 shadow rounded-xl w-auto h-50 flex items-center justify-center">
                <p className="text-black/50 text-center">
                  Your cart is empty.{" "}
                  <Link to="/products" className="text-purple-600 hover:text-purple-500">
                    Continue shopping
                  </Link>
                </p>
              </div>
          )}
          {items.map((item) => (
            <div key={item.key} className="flex gap-4 bg-gray-100 shadow rounded-2xl p-4 hover:shadow-xl transition duration-300 group">
              <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-xl"/>
              <div className="flex-1">
                <h3 className="font-600">{item.name}</h3>
                <p className="text-sm text-black/50">Size: {item.size}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQty(item.key, item.qty - 1)} className="w-7 h-7 rounded-full border border-purple-200 flex items-center justify-center">
                    −
                  </button>
                  <span className="w-6 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.key, item.qty + 1)} className="w-7 h-7 rounded-full border border-purple-200 flex items-center justify-center">
                    +
                  </button>
                </div>
              </div>
              <div className="text-right grid grid-cols-1">
                <p className="font-bold font-700">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
                <button onClick={() => removeFromCart(item.key)} className="text-xs text-red-500 mt-2">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handlePlaceOrder} className="bg-white shadow rounded-2xl p-6 h-fit space-y-5">
          <h2 className="font-bold text-xl">Order Details</h2>

          <div>
            <label className="text-sm font-600 mb-1 block">Full name</label>
            <input required name="name" value={form.name} onChange={handleChange} className="w-full rounded-xl border-1 border-purple-200 px-4 py-2.5 outline-none focus:border-purple-600" />
          </div>
          <div>
            <label className="text-sm font-600 mb-1 block">Phone</label>
            <input required type="phone" name="phone" value={form.phone} onChange={handleChange} className="w-full rounded-xl border-1 border-purple-200 px-4 py-2.5 outline-none focus:border-purple-600"/>
          </div>
          <div>
            <label className="text-sm font-600 mb-1 block">Email</label>
            <input required type="email" name="email" value={form.email} onChange={handleChange} className="w-full rounded-xl border-1 border-purple-200 px-4 py-2.5 outline-none focus:border-purple-600"/>
          </div>
          <div>
            <label className="text-sm font-600 mb-1 block">
              Information Address
            </label>
            <textarea required name="address" rows={3} value={form.address} onChange={handleChange} className="w-full rounded-xl border-1 border-purple-200 px-4 py-2.5 outline-none focus:border-purple-600 resize-none"/>
          </div>

          <div className="border-t border-black/10 pt-4 flex justify-between font-700">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {status === "placed" && (
                <p className="text-purple-700">
                  Order Successfully, Please Shoping More.
                </p>
          )}

          <button type="submit" disabled={items.length === 0 || status === "placing"} className="w-full rounded-xl bg-purple-600 text-white font-600 py-3 hover:bg-purple-700 transition-colors disabled:opacity-50">
            {status === "placing" ? "Placing order..." : "Place Order"}
          </button>

          {status === "error" && (
            <p className="text-sm text-red-600">
              Something went wrong placing your order. Try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
