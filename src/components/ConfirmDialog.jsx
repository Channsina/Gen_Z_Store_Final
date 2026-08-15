import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "default", // "default" | "danger"
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onCancel?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  const confirmClasses =
    tone === "danger"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-purple-600 hover:bg-purple-700";

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-fadeUp">
        <h2 className="font-display font-700 text-xl text-slate-900">{title}</h2>
        {description && (
          <p className="text-sm text-black/60 mt-2">{description}</p>
        )}
        <div className="flex gap-3 mt-6">
          <button type="button" onClick={onCancel} className="flex-1 rounded-xl border border-black/15 font-600 py-2.5 hover:bg-black/5 transition-colors cursor-pointer">
            {cancelLabel}
          </button>
          <button type="button" onClick={onConfirm} className={`flex-1 rounded-xl text-white font-600 py-2.5 transition-colors cursor-pointer ${confirmClasses}`}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
