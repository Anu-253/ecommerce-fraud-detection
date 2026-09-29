import React from "react";

const STEPS = [
  {
    icon: "ri-image-2-line",
    title: "We audit the listing",
    body: "Photos and claims are checked against unretouched customer deliveries. Mismatches lower the Reality Score.",
  },
  {
    icon: "ri-shield-check-line",
    title: "We score the seller",
    body: "Delivery reliability, dispute history and photo authenticity roll up into a single Seller Trust score.",
  },
  {
    icon: "ri-price-tag-3-line",
    title: "We track the price",
    body: "Every listing carries a real price history, so a discount badge always means a genuine drop.",
  },
  {
    icon: "ri-lock-line",
    title: "We hold the payment",
    body: "Funds sit in escrow until delivery is confirmed — protected by ShopShield's Fraud Shield.",
  },
];

const HowItWorksModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-cream-soft border border-line p-7 md:p-8 animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="section-eyebrow">How ShopShield Works</p>
            <h3 className="font-serif text-2xl text-ink">Shop Smarter, Step by Step</h3>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-ink-muted hover:text-ink">
            <i className="ri-close-line text-xl" />
          </button>
        </div>

        <div className="space-y-6">
          {STEPS.map((s, i) => (
            <div key={s.title} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-plum-50 text-plum">
                <i className={`${s.icon} text-lg`} />
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-widest2 text-ink-muted mb-1">Step {i + 1}</p>
                <h4 className="font-medium text-ink mb-1">{s.title}</h4>
                <p className="text-sm text-ink-soft leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksModal;
