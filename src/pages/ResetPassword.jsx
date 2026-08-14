import { useEffect, useState } from "react";
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { auth } from "../lib/firebaseClient";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  const [email, setEmail] = useState("");
  const [checking, setChecking] = useState(true);
  const [validCode, setValidCode] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Verify the reset link/code as soon as the page loads
  useEffect(() => {
    if (!oobCode) {
      setError("This reset link is invalid or has expired.");
      setChecking(false);
      return;
    }

    verifyPasswordResetCode(auth, oobCode)
      .then((userEmail) => {
        setEmail(userEmail);
        setValidCode(true);
      })
      .catch(() => {
        setError("This reset link is invalid or has expired.");
      })
      .finally(() => setChecking(false));
  }, [oobCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);
      await confirmPasswordReset(auth, oobCode, password);
      setDone(true);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      console.error(err.code, err.message);
      if (err.code === "auth/weak-password") {
        setError("Password is too weak.");
      } else if (err.code === "auth/expired-action-code") {
        setError("This reset link has expired. Please request a new one.");
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
            <h1 className="text-2xl sm:text-3xl font-bold text-purple-600">Reset password</h1>
            {validCode && !done && (
              <p className="mt-2 text-sm text-gray-500">
                Set a new password for <span className="font-medium">{email}</span>
              </p>
            )}
          </div>

          {checking && (
            <p className="text-center text-sm text-gray-500">Verifying reset link...</p>
          )}

          {!checking && error && !validCode && (
            <div className="rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 text-center">
              {error}
              <div className="mt-3">
                <Link to="/forgot-password" className="text-purple-600 font-medium hover:text-purple-700">
                  Request a new link
                </Link>
              </div>
            </div>
          )}

          {done && (
            <div className="rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 text-center">
              Your password has been reset. Redirecting to login...
            </div>
          )}

          {validCode && !done && (
            <>
              {error && (
                <div className="mb-5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5">
                  {error}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                    New password
                  </label>
                  <input type="password" id="password" placeholder="At least 8 characters" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"/>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Confirm new password
                  </label>
                  <input type="password" id="confirm-password" placeholder="Re-enter your new password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"/>
                </div>

                <button type="submit" disabled={loading} className="w-full h-11 flex items-center justify-center text-white font-medium rounded-2xl bg-purple-600 hover:bg-purple-700 transition disabled:opacity-60">
                  {loading ? "Resetting..." : "Reset password"}
                </button>
              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default ResetPassword;