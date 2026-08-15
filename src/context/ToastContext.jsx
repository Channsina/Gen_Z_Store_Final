import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { ToastContext } from "./toast-context";

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, opts = {}) => {
    const id = ++idCounter;
    const toast = { id, message, tone: opts.tone || "default" };
    setToasts((prev) => [...prev, toast]);
    const duration = opts.duration ?? 3500;
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2 items-center px-4 w-full pointer-events-none">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`pointer-events-auto rounded-full shadow-lg px-5 py-3 text-sm font-600 text-white animate-fadeUp ${
                t.tone === "success"
                  ? "bg-green-600"
                  : t.tone === "error"
                  ? "bg-red-600"
                  : "bg-slate-900"
              }`}
            >
              {t.message}
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}
