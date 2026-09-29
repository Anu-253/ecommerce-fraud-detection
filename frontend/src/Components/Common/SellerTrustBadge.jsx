import React from "react";
import { trustTier } from "../../lib/trust";

const SellerTrustBadge = ({ score, size = "sm" }) => {
  if (score === null || score === undefined) return null;
  const tier = trustTier(score);

  if (size === "sm") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[10.5px] font-medium tracking-wide text-ink-soft">
        <i className="ri-shield-check-line text-plum text-[12px]" />
        Seller Trust {score}
      </span>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-[11px] uppercase tracking-widest2 text-ink-muted">Seller Trust</p>
        <p className="font-serif text-sm text-ink">
          {score}/100 <span className={tier.tone === "sage" ? "text-sage" : "text-rust"}>— {tier.label}</span>
        </p>
      </div>
      <div className="h-1.5 w-full rounded-full bg-line overflow-hidden">
        <div className="h-full bg-plum rounded-full" style={{ width: `${score}%` }} />
      </div>
    </div>
  );
};

export default SellerTrustBadge;
