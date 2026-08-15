import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";

import { auth } from "../lib/firebaseClient";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email, {
        // Where the reset link in the email should send the user back to.
        // Must be an authorized domain in your Firebase Auth settings.
        url: `${window.location.origin}/reset-password`,
      });
      setSent(true);
    } catch (err) {
      console.error(err.code, err.message);
      if (err.code === "auth/user-not-found") {
        // Avoid confirming/denying which emails exist
        setSent(true);
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4 py-10 sm:py-16">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-10">

                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-purple-600">Forgot password?</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Enter your email and we'll send you a link to reset it
                    </p>
                </div>

                {error && (
                    <div className="mb-5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5">
                        {error}
                    </div>
                )}

                {sent ? (
                    <div className="mb-5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3">
                        If an account exists for <span className="font-medium">{email}</span>, a reset
                        link has been sent. Check your inbox (and spam folder).
                    </div>
                ) : (
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email
                            </label>
                            <input type="email" id="email" name="email" placeholder="sok.pisey@gmail.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"/>
                        </div>

                        <button type="submit" disabled={loading} className="w-full h-11 flex items-center justify-center text-white font-medium rounded-2xl bg-purple-600 hover:bg-purple-700 transition disabled:opacity-60">
                            {loading ? "Sending..." : "Send reset link"}
                        </button>
                    </form>
                )}

                <p className="text-center text-sm text-gray-500 mt-8">
                    Remembered your password?{" "}
                    <Link to="/login" className="text-purple-600 font-medium hover:text-purple-700">
                        Log in
                    </Link>
                </p>

            </div>
        </div>

    </div>
  );
}

export default ForgotPassword;