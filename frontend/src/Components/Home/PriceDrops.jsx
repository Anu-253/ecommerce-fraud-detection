import React from "react";
import CatalogGrid from "../products/CatalogGrid";

const PriceDrops = ({ products }) => {
  return (
    <section className="py-16 md:py-20 bg-sand-light/60">
      <div className="container-shop">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="section-eyebrow">Price Transparency</p>
            <h2 className="section-title">Price Drops</h2>
            <p className="text-ink-muted mt-2 max-w-md">
              Every markdown is tracked against its original listed price — no inflated
              "before" prices, ever.
            </p>
          </div>
        </div>

        <CatalogGrid products={products} emptyLabel="No active price drops right now." />
      </div>
    </section>
  );
};

export default PriceDrops;
