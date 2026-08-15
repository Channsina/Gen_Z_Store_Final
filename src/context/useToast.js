import { useContext } from "react";
import { ToastContext } from "./toast-context";

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Safe no-op fallback if used outside the provider during dev/HMR.
    return { showToast: () => {} };
  }
  return ctx;
}
