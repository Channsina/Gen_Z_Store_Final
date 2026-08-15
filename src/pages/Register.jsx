import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { auth, db } from "../lib/firebaseClient";

const googleProvider = new GoogleAuthProvider();

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!agreed) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    try {
      setLoading(true);

      // 1. Create Firebase Authentication account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // 2. Save the display name on the auth profile
      await updateProfile(user, { displayName: fullName });

      // 3. Create the user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email,
        role: "customer",
        createdAt: serverTimestamp(),
      });

      // 4. Redirect to login
      navigate("/login", { state: from ? { from } : undefined });
    } catch (err) {
      console.error(err.code, err.message);
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Create a Firestore profile the first time this Google user signs up
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

      navigate("/login", { state: from ? { from } : undefined });
    } catch (err) {
      console.error(err);
      setError("Google sign-up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-10 sm:py-16">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-10">

          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-purple-800">Create your account</h1>
            <p className="mt-2 text-sm text-gray-500">Join GenZ Store and start shopping</p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Full name
              </label>
              <input type="text" id="name" name="fullName" placeholder="SoK Pisey" required value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"/>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <input type="email" id="email" name="email" placeholder="sok.pisey@gmail.com" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"/>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input type="password" id="password" name="password" placeholder="At least 8 characters"  required  value={formData.password}  onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"/>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm password
              </label>
              <input type="password" id="confirm-password" name="confirmPassword" placeholder="Re-enter your password" required value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"/>
            </div>

            <div className="flex items-start">
              <input type="checkbox" id="terms" name="terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} required className="w-4 h-4 mt-0.5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"/>
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-purple-600 hover:text-purple-700">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="text-purple-600 hover:text-purple-700">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full h-11 flex items-center justify-center text-white font-medium rounded-2xl bg-purple-600 hover:bg-purple-700 transition disabled:opacity-60">
              {loading ? "Creating account..." : "Sign up"}
            </button>

          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-sm text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <button type="button" onClick={handleGoogleSignUp} disabled={loading} className="w-full h-11 flex items-center justify-center gap-2 rounded-2xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-60">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.69-2.26 1.1-3.71 1.1-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.14A6.96 6.96 0 0 1 5.4 12c0-.74.13-1.46.36-2.14V7.02H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.98l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.02l3.66 2.84c.87-2.6 3.3-4.48 6.16-4.48z"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 font-medium hover:text-purple-700">
              Log in
            </Link>
          </p>

        </div>
      </main>

    </div>
  );
}

export default Register;