import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CatalogGrid from "../Components/products/CatalogGrid";
import { loadCatalog } from "../lib/catalog";

const normalize = (value = "") => String(value).toLowerCase().replace(/[\s_-]+/g, "");

const CollectionPage = () => {
  const [searchParams] = useSearchParams();
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);

  const gender = searchParams.get("gender") || "";
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const offer = searchParams.get("offer") === "true";
  const requestedSort = searchParams.get("sort") || "";

  const [sort, setSort] = useState(requestedSort || "featured");
  const [rating, setRating] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    setLoading(true);
    loadCatalog().then((items) => {
      setCatalog(items);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (requestedSort) setSort(requestedSort);
  }, [requestedSort]);

  const filtered = useMemo(() => {
    let items = [...catalog];

    if (gender) {
      items = items.filter((p) => normalize(p.gender) === normalize(gender));
    }

    if (category) {
      const wanted = normalize(category);
      items = items.filter((p) => {
        const fields = [p.category, p.masterCategory, p.articleType];
        return fields.some((field) => normalize(field).includes(wanted) || wanted.includes(normalize(field)));
      });
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((p) =>
        [p.name, p.category, p.masterCategory, p.articleType, p.gender, p.color, p.usage]
          .filter(Boolean)
          .some((field) => String(field).toLowerCase().includes(q))
      );
    }

    if (offer) items = items.filter((p) => p.makeOffer);
    if (rating) items = items.filter((p) => p.rating >= Number(rating));
    if (maxPrice) items = items.filter((p) => p.price <= Number(maxPrice));

    if (sort === "price-low") items.sort((a, b) => a.price - b.price);
    else if (sort === "price-high") items.sort((a, b) => b.price - a.price);
    else if (sort === "rating") items.sort((a, b) => b.rating - a.rating);
    else if (sort === "discount") items.sort((a, b) => b.discount - a.discount);
    else if (sort === "trusted") items.sort((a, b) => (b.sellerTrustScore + b.realityScore) - (a.sellerTrustScore + a.realityScore));
    else items.sort((a, b) => b.numReviews - a.numReviews);

    return items;
  }, [catalog, gender, category, search, offer, rating, maxPrice, sort]);

  const title = search
    ? `Results for "${search}"`
    : gender || category || (offer ? "Make an Offer" : "All products");

  const activeCount = [gender, category, search, offer, rating, maxPrice].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-cream">
      <div className="border-b border-line bg-cream-soft">
        <div className="container-shop py-8 md:py-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-eyebrow">ShopShield catalog · 120 products</p>
              <h1 className="section-title text-3xl md:text-5xl">{title}</h1>
              <p className="mt-2 text-sm text-ink-muted">
                {filtered.length} matching {filtered.length === 1 ? "product" : "products"}
                {activeCount ? ` · ${activeCount} active filter${activeCount > 1 ? "s" : ""}` : ""}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                ["featured", "Popular"],
                ["rating", "Top rated"],
                ["discount", "Biggest drops"],
                ["price-low", "Price ↑"],
                ["price-high", "Price ↓"],
                ["trusted", "Trusted"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setSort(value)}
                  className={`rounded-full border px-3.5 py-2 text-[10px] font-semibold uppercase tracking-widest2 transition ${
                    sort === value ? "border-ink bg-ink text-cream" : "border-line bg-cream text-ink-soft hover:border-ink"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-shop py-7 md:py-9">
        <div className="mb-7 grid gap-3 rounded-2xl border border-line bg-cream-soft p-3 sm:grid-cols-3">
          <label className="flex items-center gap-2 rounded-xl bg-cream px-3 py-2">
            <i className="ri-star-line text-plum" />
            <span className="text-[9px] uppercase tracking-widest2 text-ink-muted">Rating</span>
            <select value={rating} onChange={(e) => setRating(e.target.value)} className="ml-auto bg-transparent text-sm text-ink outline-none">
              <option value="">Any</option>
              <option value="4.5">4.5+</option>
              <option value="4">4+</option>
              <option value="3.5">3.5+</option>
            </select>
          </label>

          <label className="flex items-center gap-2 rounded-xl bg-cream px-3 py-2">
            <i className="ri-money-rupee-circle-line text-plum" />
            <span className="text-[9px] uppercase tracking-widest2 text-ink-muted">Max price</span>
            <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="ml-auto bg-transparent text-sm text-ink outline-none">
              <option value="">Any</option>
              <option value="1000">₹1,000</option>
              <option value="2500">₹2,500</option>
              <option value="5000">₹5,000</option>
              <option value="10000">₹10,000</option>
            </select>
          </label>

          <div className="flex items-center gap-2 rounded-xl bg-ink px-3 py-2 text-cream">
            <i className="ri-shield-check-line text-sand" />
            <span className="text-[10px]">Trust signals are sourced from the supplied catalog.</span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-line bg-cream-soft p-2.5">
                <div className="aspect-[4/4.7] rounded-xl bg-sand-light" />
                <div className="mt-3 h-3 w-4/5 rounded bg-sand-light" />
                <div className="mt-2 h-3 w-1/2 rounded bg-sand-light" />
              </div>
            ))}
          </div>
        ) : (
          <CatalogGrid
            products={filtered}
            columns="md:grid-cols-4"
            emptyLabel="No products match those filters."
          />
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
