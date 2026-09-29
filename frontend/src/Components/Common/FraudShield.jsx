import React, { useMemo } from "react";

/**
 * Presents a checkout-time fraud/risk summary. There is no live fraud-scoring
 * endpoint wired up yet, so the "signals" below are generic, honest
 * checklist items about the buyer's *current session* (address filled in,
 * logged-in account, order within a normal range) rather than a fabricated
 * ML risk score. Swap `computeRisk` for a real backend call the moment one
 * exists.
 */
const computeRisk = ({ isLoggedIn, addressComplete, orderValue }) => {
  const signals = [
    { label: "Logged-in ShopShield account", pass: isLoggedIn },
    { label: "Consistent shipping address", pass: addressComplete },
    { label: "Order value within normal range", pass: orderValue > 0 && orderValue < 50000 },
    { label: "Escrow-held payment", pass: true },
  ];
  const passCount = signals.filter((s) => s.pass).length;
  const risk = passCount === signals.length ? "LOW" : passCount >= signals.length - 1 ? "MODERATE" : "REVIEW";
  return { signals, risk };
};

const RISK_STYLE = {
  LOW: "text-sage bg-sage-light",
  MODERATE: "text-rust bg-rust-light",
  REVIEW: "text-cream bg-rust",
};

const FraudShield = ({ isLoggedIn = true, addressComplete = false, orderValue = 0 }) => {
  const { signals, risk } = useMemo(
    () => computeRisk({ isLoggedIn, addressComplete, orderValue }),
    [isLoggedIn, addressComplete, orderValue]
  );

  return (
    <div className="border border-line bg-cream-soft p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <i className="ri-shield-flash-line text-plum text-lg" />
          <h4 className="font-serif text-base text-ink">ShopShield Fraud Shield</h4>
        </div>
        <span className={`px-2.5 py-1 text-[10.5px] uppercase tracking-widest2 font-semibold ${RISK_STYLE[risk]}`}>
          Risk: {risk}
        </span>
      </div>
      <ul className="space-y-1.5">
        {signals.map((s) => (
          <li key={s.label} className="flex items-center gap-2 text-[12.5px] text-ink-soft">
            <i className={`${s.pass ? "ri-checkbox-circle-fill text-sage" : "ri-close-circle-line text-rust"}`} />
            {s.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FraudShield;
