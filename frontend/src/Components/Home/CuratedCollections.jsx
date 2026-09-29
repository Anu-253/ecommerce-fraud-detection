import React from "react";
import { Link } from "react-router-dom";

const TILES = [
  {
    eyebrow: "High confidence",
    title: "Trusted picks",
    body: "Listings with strong Reality Score and Seller Trust signals.",
    to: "/collection/all?sort=trusted",
    icon: "ri-shield-star-line",
    className: "bg-plum text-cream",
  },
  {
    eyebrow: "Save smarter",
    title: "Real price drops",
    body: "Discount-led browsing without giant promo banners.",
    to: "/collection/all?sort=discount",
    icon: "ri-price-tag-3-line",
    className: "bg-sand-light text-ink",
  },
  {
    eyebrow: "Your shortlist",
    title: "Make an offer",
    body: "Spot listings where bargaining is enabled and send an offer.",
    to: "/collection/all?offer=true",
    icon: "ri-hand-coin-line",
    className: "bg-sage-light text-ink",
  },
];

const CuratedCollections = () => (
  <section className="py-10 md:py-14">
    <div className="container-shop">
      <div className="mb-7">
        <p className="section-eyebrow">ShopShield edits</p>
        <h2 className="section-title">Built around how you actually shop.</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {TILES.map((tile, i) => (
          <Link
            key={tile.title}
            to={tile.to}
            className={`group relative min-h-[230px] overflow-hidden rounded-[26px] p-6 ${tile.className} ${i === 1 ? "border border-line" : ""}`}
          >
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border-[22px] border-current opacity-[.08]" />
            <div className="relative flex h-full flex-col">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                <i className={`${tile.icon} text-xl`} />
              </span>
              <div className="mt-auto">
                <p className={`text-[9px] uppercase tracking-widest2 ${i === 1 ? "text-ink-muted" : "text-current opacity-60"}`}>
                  {tile.eyebrow}
                </p>
                <h3 className="mt-1 font-serif text-2xl">{tile.title}</h3>
                <p className={`mt-2 max-w-xs text-[13px] leading-5 ${i === 1 ? "text-ink-soft" : "opacity-70"}`}>
                  {tile.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest2">
                  Explore <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CuratedCollections;
