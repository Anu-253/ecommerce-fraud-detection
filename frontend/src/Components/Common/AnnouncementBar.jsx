import React from "react";

const AnnouncementBar = () => {
  return (
    <div className="bg-ink text-cream text-[12px]">
      <div className="container-shop flex items-center justify-between gap-4 py-2">
        <div className="hidden md:flex items-center gap-1.5 text-cream/80">
          <i className="ri-shield-check-line" />
          <span>ShopShield Anti-Counterfeit &amp; Escrow Guaranteed</span>
        </div>

        <div className="flex-1 md:flex-none text-center">
          <span className="font-medium">Shop Smarter. Know What You're Buying.</span>
          <span className="hidden sm:inline text-cream/60"> &nbsp;|&nbsp; Complimentary Tracked Delivery Over ₹4,000</span>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-cream/80">
          <i className="ri-phone-line" />
          <span>Support: +91 90081 55041</span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
