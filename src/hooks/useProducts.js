import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebaseClient";

const COLLECTION = "products";

/**
 * Live list of products from Firestore. This is the single source of truth
 * for the catalog — there's no local/static fallback data. Add products
 * from the admin dashboard (Products page).
 */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, COLLECTION),
      (snap) => {
        setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  return { products, loading };
}

export function getProductsByCategory(products, category) {
  if (!category || category === "all") return products;
  return products.filter((p) => p.category === category);
}

export async function createProduct(data) {
  return addDoc(collection(db, COLLECTION), {
    ...data,
    price: Number(data.price) || 0,
    stock: Number(data.stock) || 0,
    createdAt: serverTimestamp(),
  });
}

export async function updateProduct(id, data) {
  const payload = { ...data };
  if ("price" in payload) payload.price = Number(payload.price) || 0;
  if ("stock" in payload) payload.stock = Number(payload.stock) || 0;
  return updateDoc(doc(db, COLLECTION, id), payload);
}

export async function updateStock(id, stock) {
  return updateDoc(doc(db, COLLECTION, id), { stock: Number(stock) || 0 });
}

export async function deleteProduct(id) {
  return deleteDoc(doc(db, COLLECTION, id));
}
