import React from "react";

const tierColor = (score) => {
  if (score >= 85) return "#4C6B4F"; // sage
  if (score >= 65) return "#A64A2E"; // rust
  return "#8A3B3B";
};

/**
 * Reality Score™ — how closely the listing photos/claims match the
 * physical product, per ShopShield's audit.
 */
const RealityScore = ({ score, size = "sm" }) => {
  if (score === null || score === undefined) return null;
  const color = tierColor(score);

  if (size === "sm") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[10.5px] font-medium tracking-wide text-ink-soft">
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        Reality Score {score}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-14 w-14 shrink-0">
        <svg viewBox="0 0 36 36" className="h-14 w-14 -rotate-90">
          <circle cx="18" cy="18" r="15.5" fill="none" stroke="#E1D7C3" strokeWidth="3" />
          <circle
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeDasharray={`${(score / 100) * 97.4} 97.4`}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-serif text-sm text-ink">
          {score}
        </span>
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-widest2 text-ink-muted">Reality Score™</p>
        <p className="text-sm text-ink-soft">Listing matches physical product</p>
      </div>
    </div>
  );
};

export default RealityScore;
