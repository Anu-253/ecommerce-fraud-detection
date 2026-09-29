import React from "react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { label: "Women", query: "gender=Women", icon: "ri-women-line", tone: "bg-plum-50 text-plum" },
  { label: "Men", query: "gender=Men", icon: "ri-men-line", tone: "bg-sage-light text-sage" },
  { label: "Top Wear", query: "category=Topwear", icon: "ri-shirt-line", tone: "bg-sand-light text-rust" },
  { label: "Bottom Wear", query: "category=Bottomwear", icon: "ri-pant-line", tone: "bg-sand-light text-ink" },
  { label: "Dresses", query: "category=Dress", icon: "ri-shirt-line", tone: "bg-plum-50 text-plum" },
  { label: "Accessories", query: "category=Accessories", icon: "ri-handbag-line", tone: "bg-sage-light text-sage" },
];

const CategorySection = () => (
  <section className="border-b border-line bg-cream-soft py-12 md:py-16">
    <div className="container-shop">
      <div className="flex items-end justify-between gap-5">
        <div>
          <p className="section-eyebrow">Browse the catalog</p>
          <h2 className="section-title">Find your lane.</h2>
        </div>
        <Link to="/collection/all" className="hidden items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest2 text-ink-soft hover:text-plum sm:inline-flex">
          All products <i className="ri-arrow-right-line" />
        </Link>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {CATEGORIES.map((c) => (
          <Link
            key={c.label}
            to={`/collection/all?${c.query}`}
            className="group rounded-2xl border border-line bg-cream p-4 transition-all hover:-translate-y-1 hover:border-sand-dark hover:shadow-soft"
          >
            <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${c.tone}`}>
              <i className={`${c.icon} text-xl`} />
            </span>
            <div className="mt-7 flex items-end justify-between gap-2">
              <span className="font-serif text-[17px] text-ink">{c.label}</span>
              <i className="ri-arrow-right-up-line text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
            <p className="mt-1 text-[9px] uppercase tracking-widest2 text-ink-muted">Shop now</p>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategorySection;
