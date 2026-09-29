export function trustTier(score) {
  if (score >= 90) return { label: "Excellent Trust", tone: "sage" };
  if (score >= 75) return { label: "Good Trust", tone: "sage" };
  if (score >= 60) return { label: "Fair Trust", tone: "rust" };
  return { label: "Needs Review", tone: "rust" };
}
