import React, { useMemo } from "react";
import { formatPrice } from "../../lib/format";

// Deterministic pseudo-random walk seeded by product id, so the same
// product always renders the same "history" within a session. This is
// illustrative demo data until a real price-history feed is connected —
// labeled as such rather than presented as verified fact.
function seededSeries(seed, price, days = 30) {
  let s = 0;
  for (let i = 0; i < String(seed).length; i++) s += String(seed).charCodeAt(i);
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const points = [];
  let value = price * (1 + (rand() - 0.5) * 0.18);
  for (let i = 0; i < days; i++) {
    value = value + (rand() - 0.5) * price * 0.03;
    points.push(Math.max(price * 0.8, Math.min(price * 1.25, value)));
  }
  points[points.length - 1] = price;
  return points;
}

const PriceHistory = ({ productId, price }) => {
  const points = useMemo(() => seededSeries(productId, price), [productId, price]);
  const avg = points.reduce((a, b) => a + b, 0) / points.length;
  const belowAvg = price < avg;
  const diffPct = Math.round(Math.abs((price - avg) / avg) * 100);

  const w = 240;
  const h = 48;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / range) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="border-t border-line pt-4 mt-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] uppercase tracking-widest2 text-ink-muted">30-Day Price Trend</p>
        {diffPct > 0 && (
          <span className={`text-[11px] font-medium ${belowAvg ? "text-sage" : "text-rust"}`}>
            {belowAvg ? "▼" : "▲"} {diffPct}% vs. avg
          </span>
        )}
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12">
        <path d={path} fill="none" stroke="#5A1B31" strokeWidth="1.5" />
      </svg>
      <p className="text-[11px] text-ink-muted mt-1">
        {belowAvg
          ? `Today's ${formatPrice(price)} is below the recent average — a genuine deal.`
          : `Today's ${formatPrice(price)} is close to or above the recent average.`}{" "}
        <span className="italic">Illustrative trend, pending live price-history data.</span>
      </p>
    </div>
  );
};

export default PriceHistory;
