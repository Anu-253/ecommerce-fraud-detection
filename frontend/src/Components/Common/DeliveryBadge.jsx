import React from "react";

const DeliveryBadge = ({ fastDelivery, deliveryTime, className = "" }) => {
  if (!fastDelivery && !deliveryTime) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10.5px] font-medium text-ink-soft ${className}`}>
      <i className="ri-truck-line text-[12px]" />
      {deliveryTime || "Fast delivery"}
    </span>
  );
};

export default DeliveryBadge;
