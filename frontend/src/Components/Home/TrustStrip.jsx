import React from "react";

const ITEMS = [
  { icon: "ri-truck-line", label: "Fast Delivery" },
  { icon: "ri-shield-check-line", label: "Trusted Products" },
  { icon: "ri-chat-check-line", label: "Verified Reviews" },
  { icon: "ri-price-tag-3-line", label: "Price Transparency" },
  { icon: "ri-hand-coin-line", label: "Make an Offer" },
  { icon: "ri-lock-line", label: "Secure Payments" },
];

const TrustStrip = () => (
  <section className="border-y border-line bg-cream-soft">
    <div className="container-shop grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y divide-line sm:divide-y-0 sm:divide-x">
      {ITEMS.map((item) => (
        <div key={item.label} className="flex flex-col items-center justify-center gap-2 py-6 text-center px-3">
          <i className={`${item.icon} text-xl text-plum`} />
          <span className="text-[11px] uppercase tracking-widest2 text-ink-soft">{item.label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default TrustStrip;
