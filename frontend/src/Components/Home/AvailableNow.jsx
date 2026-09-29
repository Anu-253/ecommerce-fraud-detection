import React from "react";
import { Link } from "react-router-dom";
import CatalogGrid from "../products/CatalogGrid";

const AvailableNow = ({ products, loading, error, title = "Available Now", subtitle }) => {
  return (
    <section className="py-12 md:py-16">
      <div className="container-shop">
        <div className="mb-7 flex items-end justify-between gap-5">
          <div>
            <p className="section-eyebrow">Live from the supplied catalog</p>
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="mt-2 max-w-xl text-[13px] leading-6 text-ink-muted">{subtitle}</p>}
          </div>
          <Link
            to="/collection/all"
            className="hidden items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest2 text-ink-soft hover:text-plum sm:inline-flex"
          >
            View all <i className="ri-arrow-right-line" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-line bg-cream-soft p-2.5">
                <div className="aspect-[4/4.7] rounded-xl bg-sand-light" />
                <div className="mt-3 h-3 w-4/5 rounded bg-sand-light" />
                <div className="mt-2 h-3 w-1/2 rounded bg-sand-light" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-rust/20 bg-rust-light p-6 text-sm text-rust">{error}</div>
        ) : (
          <CatalogGrid products={products} columns="grid-cols-2 md:grid-cols-4" />
        )}
      </div>
    </section>
  );
};

export default AvailableNow;
