export function formatPrice(value) {
  const n = Number(value) || 0;
  return `₹${n.toLocaleString("en-IN")}`;
}

export function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}
