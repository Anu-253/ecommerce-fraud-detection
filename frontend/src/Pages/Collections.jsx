import React from "react";
import { Link } from "react-router-dom";

const COLLECTIONS = [
  { title: "Trusted Picks", body: "High Reality Score + Seller Trust combinations.", to: "/collection/all?sort=trusted", icon: "ri-shield-star-line", tone: "bg-plum text-cream" },
  { title: "Price Drops", body: "Browse the strongest supplied catalog discounts.", to: "/collection/all?sort=discount", icon: "ri-price-tag-3-line", tone: "bg-sand-light text-ink" },
  { title: "Top Rated", body: "Start with the products carrying the strongest ratings.", to: "/collection/all?sort=rating", icon: "ri-star-smile-line", tone: "bg-sage-light text-ink" },
  { title: "Make an Offer", body: "Find products where bargaining is enabled.", to: "/collection/all?offer=true", icon: "ri-hand-coin-line", tone: "bg-ink text-cream" },
];

const Collections = () => (
  <div className="container-shop py-10 md:py-14">
    <p className="section-eyebrow">ShopShield edits</p>
    <h1 className="section-title mb-3">Collections, without the giant banners.</h1>
    <p className="max-w-2xl text-sm leading-6 text-ink-muted">
      Curated entry points built from the actual 120-product catalog and its trust, pricing and review fields.
    </p>

    <div className="mt-9 grid gap-4 sm:grid-cols-2">
      {COLLECTIONS.map((c) => (
        <Link key={c.title} to={c.to} className={`group relative min-h-[240px] overflow-hidden rounded-[26px] p-7 ${c.tone}`}>
          <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full border-[28px] border-current opacity-[.08]" />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <i className={`${c.icon} text-2xl`} />
          </span>
          <div className="relative mt-20">
            <h2 className="font-serif text-3xl">{c.title}</h2>
            <p className="mt-2 max-w-md text-sm opacity-70">{c.body}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest2">
              Explore <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default Collections;
