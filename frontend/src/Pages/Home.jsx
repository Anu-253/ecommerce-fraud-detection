import React, { useEffect, useMemo, useState } from "react";

import Hero from "../Components/Layout/Hero";
import TrustStrip from "../Components/Home/TrustStrip";
import CategorySection from "../Components/Home/CategorySection";
import CuratedCollections from "../Components/Home/CuratedCollections";
import AvailableNow from "../Components/Home/AvailableNow";
import PriceDrops from "../Components/Home/PriceDrops";
import TrustedPicks from "../Components/Home/TrustedPicks";
import EditorialSection from "../Components/Home/EditorialSection";
import CatalogGrid from "../Components/products/CatalogGrid";

import {
  loadCatalog,
  pickAvailableNow,
  pickPriceDrops,
  pickTrustedPicks,
} from "../lib/catalog";

const Home = () => {
  const [catalog, setCatalog] = useState([]);
  const [catalogError, setCatalogError] = useState(false);

  useEffect(() => {
    loadCatalog()
      .then((items) => {
        setCatalog(items);
        setCatalogError(items.length === 0);
      })
      .catch(() => setCatalogError(true));
  }, []);

  const featured = useMemo(() => pickAvailableNow(catalog, 8), [catalog]);
  const priceDrops = useMemo(() => pickPriceDrops(catalog, 8), [catalog]);
  const trustedPicks = useMemo(() => pickTrustedPicks(catalog, 8), [catalog]);

  return (
    <div className="overflow-hidden">
      <Hero products={featured} totalProducts={catalog.length} />
      <TrustStrip />
      <CategorySection />
      <CuratedCollections />

      <AvailableNow
        products={featured}
        loading={!catalog.length && !catalogError}
        error={catalogError ? "The local catalog could not be loaded." : null}
        title="Popular in the verified catalog"
        subtitle="Real product names, prices, ratings, stock and ShopShield trust signals from the supplied 120-item catalog."
      />

      <PriceDrops products={priceDrops} />
      <TrustedPicks products={trustedPicks} />

      <section className="py-12 md:py-16">
        <div className="container-shop">
          <div className="mb-7 flex items-end justify-between gap-5">
            <div>
              <p className="section-eyebrow">More to explore</p>
              <h2 className="section-title">A little of everything.</h2>
            </div>
          </div>
          <CatalogGrid products={catalog.slice(20, 28)} columns="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" />
        </div>
      </section>

      <EditorialSection
        eyebrow="The Reality Protocol"
        title="The product card now tells you more than just the price."
        body="ShopShield surfaces rating, review volume, stock, delivery, Reality Score and Seller Trust without forcing users through a wall of marketing copy."
        icon="ri-radar-line"
        stats={[
          { value: "120", label: "Catalog listings" },
          { value: "24", label: "Data fields" },
          { value: "1", label: "Shopping view" },
        ]}
      />

      <EditorialSection
        eyebrow="Seller trust & transactions"
        title="Trust signals stay visible while you shop."
        body="The experience keeps the anti-fraud and seller-transparency story close to the purchase journey instead of hiding it inside a separate dashboard."
        tone="ink"
        icon="ri-shield-star-line"
        stats={[
          { value: "90+", label: "Trust signals" },
          { value: "4.6+", label: "Typical rating" },
          { value: "₹", label: "Indian pricing" },
        ]}
      />

      <EditorialSection
        eyebrow="Price transparency"
        title="Discounts get context, not giant sale banners."
        body="Price-drop sections use the supplied catalog discount field and keep the interface focused on products, not oversized promotional artwork."
        icon="ri-price-tag-3-line"
        stats={[
          { value: "40%", label: "Largest sample drop" },
          { value: "8", label: "Price-drop picks" },
          { value: "120", label: "Products searchable" },
        ]}
      />
    </div>
  );
};

export default Home;
