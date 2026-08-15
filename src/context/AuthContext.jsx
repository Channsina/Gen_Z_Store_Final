import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../lib/firebaseClient";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null); // Firestore users/{uid} doc (role, fullName, etc.)
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Keep the Firestore profile (role, etc.) in sync with the logged-in user
  useEffect(() => {
    if (!user) {
      setProfile(null);
      setProfileLoading(false);
      return;
    }
    setProfileLoading(true);
    const unsubscribe = onSnapshot(
      doc(db, "users", user.uid),
      (snap) => {
        setProfile(snap.exists() ? { id: snap.id, ...snap.data() } : null);
        setProfileLoading(false);
      },
      () => setProfileLoading(false)
    );
    return unsubscribe;
  }, [user]);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signup = async (name, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(cred.user, { displayName: name });
    }
    return cred;
  };

  const logout = () => signOut(auth);

  const isAdmin = profile?.role === "admin";

  const value = {
    user,
    profile,
    loading,
    profileLoading,
    isAdmin,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
