export const ORDER_STATUSES = [
  "pending",
  "processing",
  "delivered",
  "cancelled",
];

export const STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  processing: "bg-blue-100 text-blue-700 border-blue-200",
  shipped: "bg-indigo-100 text-indigo-700 border-indigo-200",
  delivered: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

export function statusLabel(status) {
  if (!status) return "Pending";
  return status.charAt(0).toUpperCase() + status.slice(1);
}
