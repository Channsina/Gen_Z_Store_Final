import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebaseClient";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/useAuth";

export default function Checkout() {
  const { items, subtotal, updateQty, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
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
      await addDoc(collection(db, "orders"), {
        userId: user?.uid || null,
        customer: form,
        items,
        subtotal,
        createdAt: serverTimestamp(),
      });
      clearCart();
      setStatus("placed");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (status === "placed") {
    return (
      <div className="container-page py-24 text-center max-w-md mx-auto">
        <h1 className="font-display font-800 text-3xl mb-3">Order Placed!</h1>
        <p className="text-black/60">
          Thanks for shopping with GenZ Store. We'll email you the order
          confirmation shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="container-page py-14">
      <h1 className="font-display font-800 text-3xl mb-10">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Cart items */}
        <div className="md:col-span-2 space-y-5">
          {items.length === 0 && (
            <p className="text-black/50">Your cart is empty.</p>
          )}
          {items.map((item) => (
            <div
              key={item.key}
              className="flex gap-4 border border-black/10 rounded-2xl p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-24 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className="font-600">{item.name}</h3>
                <p className="text-sm text-black/50">Size: {item.size}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQty(item.key, item.qty - 1)}
                    className="w-7 h-7 rounded-full border border-black/20 flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="w-6 text-center">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.key, item.qty + 1)}
                    className="w-7 h-7 rounded-full border border-black/20 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-700">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.key)}
                  className="text-xs text-red-500 mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order form / summary */}
        <form
          onSubmit={handlePlaceOrder}
          className="border border-black/10 rounded-2xl p-6 h-fit space-y-5"
        >
          <h2 className="font-display font-700 text-lg">Shipping Details</h2>

          <div>
            <label className="text-sm font-600 mb-1 block">Full name</label>
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-black/15 px-4 py-2.5 outline-none focus:border-ink"
            />
          </div>
          <div>
            <label className="text-sm font-600 mb-1 block">Email</label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-black/15 px-4 py-2.5 outline-none focus:border-ink"
            />
          </div>
          <div>
            <label className="text-sm font-600 mb-1 block">
              Shipping address
            </label>
            <textarea
              required
              name="address"
              rows={3}
              value={form.address}
              onChange={handleChange}
              className="w-full rounded-xl border border-black/15 px-4 py-2.5 outline-none focus:border-ink resize-none"
            />
          </div>

          <div className="border-t border-black/10 pt-4 flex justify-between font-700">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            disabled={items.length === 0 || status === "placing"}
            className="w-full rounded-full bg-ink text-white font-600 py-3 hover:bg-black/80 transition-colors disabled:opacity-50"
          >
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
