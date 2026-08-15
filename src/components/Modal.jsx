import { useEffect } from "react";

export default function Modal({ open, onClose, title, children, maxWidth = "max-w-2xl" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full ${maxWidth} bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto`}>
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur border-b border-black/10 rounded-t-3xl">
          <h2 className="font-display font-700 text-lg">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-black/50 hover:bg-black/5 hover:text-black transition-colors cursor-pointer">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}