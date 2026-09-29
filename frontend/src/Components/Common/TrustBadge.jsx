import React from "react";

const TONE = {
  ink: "border-line text-ink bg-cream-soft",
  plum: "border-plum/30 text-plum bg-plum-50",
  sage: "border-sage/30 text-sage bg-sage-light",
};

const TrustBadge = ({ icon, children, tone = "ink", className = "" }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-medium tracking-wide ${TONE[tone]} ${className}`}
  >
    {icon && <i className={`${icon} text-[12px] leading-none`} />}
    {children}
  </span>
);

export default TrustBadge;
