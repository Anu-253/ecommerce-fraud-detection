import React from "react";

const PriceDropBadge = ({ discount, className = "" }) => {
  if (!discount) return null;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm bg-plum text-cream px-2 py-1 text-[10.5px] font-semibold tracking-wide ${className}`}
    >
      <i className="ri-arrow-down-line text-[11px]" />
      {discount}% OFF
    </span>
  );
};

export default PriceDropBadge;
