import React from "react";
import CatalogGrid from "../products/CatalogGrid";

const TrustedPicks = ({ products }) => {
  return (
    <section id="trusted-picks" className="py-16 md:py-20">
      <div className="container-shop">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="section-eyebrow">Highest Audited Confidence</p>
            <h2 className="section-title">Trusted Picks</h2>
            <p className="text-ink-muted mt-2 max-w-md">
              Curated from listings with the strongest Reality Score and Seller Trust
              ratings in the catalog.
            </p>
          </div>
        </div>

        <CatalogGrid products={products} emptyLabel="No trusted picks available yet." />
      </div>
    </section>
  );
};

export default TrustedPicks;
