import React, { useState } from "react";
import OfferModal from "./OfferModal";

const OfferButton = ({ product, className = "", full = false }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className={`btn-outline ${full ? "w-full" : ""} ${className}`}
      >
        <i className="ri-hand-coin-line" />
        Make an Offer
      </button>
      <OfferModal open={open} onClose={() => setOpen(false)} product={product} />
    </>
  );
};

export default OfferButton;
