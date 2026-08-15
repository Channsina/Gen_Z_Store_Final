import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { auth, db } from "../lib/firebaseClient";
const googleProvider = new GoogleAuthProvider();

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Look up the user's role in Firestore and send them to the right place.
  // If they were redirected here from a protected action (e.g. Add to
  // Cart / Checkout), send them back there instead.
  const redirectByRole = async (uid) => {
    const userDoc = await getDoc(doc(db, "users", uid));
    const role = userDoc.exists() ? userDoc.data().role : "customer";
    if (from && role !== "admin") {
      navigate(from);
      return;
    }
    navigate(role === "admin" ? "/dashboard" : "/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      await setPersistence(
        auth,
        remember ? browserLocalPersistence : browserSessionPersistence
      );

      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await redirectByRole(userCredential.user.uid);
    } catch (err) {
      console.error(err.code, err.message);
      if (err.code === "auth/wrong-password") {
        setError("Wrong password.");
      } else if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Create a Firestore profile the first time a Google user signs in
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          fullName: user.displayName || "",
          email: user.email,
          role: "customer",
          createdAt: serverTimestamp(),
        });
      }

      await redirectByRole(user.uid);
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 sm:py-16">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-10">

          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-purple-600">Welcome back</h1>
            <p className="mt-2 text-sm text-gray-500">Log in to continue shopping</p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5">
              {error}
            </div>
          )}

          {!error && from && (
            <div className="mb-5 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 text-sm px-4 py-2.5">
              Log in to continue with your cart and checkout.
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <input type="email" id="email" name="email" placeholder="sok.pisey@gmail.com" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"/>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700">
                  Forgot password?
                </Link>
              </div>
              <input type="password" id="password" name="password" placeholder="••••••••" required value={formData.password} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"/>
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="remember" name="remember" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"/>
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full h-11 flex items-center justify-center text-white font-medium rounded-2xl bg-purple-600 hover:bg-purple-700 transition disabled:opacity-60">
              {loading ? "Logging in..." : "Log in"}
            </button>

          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-sm text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <button type="button" onClick={handleGoogleLogin} disabled={loading} className="w-full h-11 flex items-center justify-center gap-2 rounded-2xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-60">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.69-2.26 1.1-3.71 1.1-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.14A6.96 6.96 0 0 1 5.4 12c0-.74.13-1.46.36-2.14V7.02H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.98l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.02l3.66 2.84c.87-2.6 3.3-4.48 6.16-4.48z"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{" "}
            <Link to="/Register" state={from ? { from } : undefined} className="text-purple-600 font-medium hover:text-purple-700">
              Sign up
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;