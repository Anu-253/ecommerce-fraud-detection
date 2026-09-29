import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import HowItWorksModal from "../Common/HowItWorksModal";
import { formatPrice } from "../../lib/format";

const Hero = ({ products = [], totalProducts = 0 }) => {
  const [howOpen, setHowOpen] = useState(false);

  const spotlight = useMemo(() => {
    return [...products]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3);
  }, [products]);

  const avgRating = products.length
    ? (products.reduce((sum, p) => sum + Number(p.rating || 0), 0) / products.length).toFixed(1)
    : "—";
  const avgTrust = products.length
    ? Math.round(products.reduce((sum, p) => sum + Number(p.sellerTrustScore || 0), 0) / products.length)
    : "—";

  return (
    <section className="relative overflow-hidden border-b border-line bg-cream">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-plum/10 blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-sand-dark/20 blur-3xl" />

      <div className="container-shop relative grid grid-cols-1 items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.02fr_.98fr] lg:gap-14 lg:py-20">
        <div>
          <span className="pill mb-5 border-plum/15 bg-plum-50 text-plum">
            <i className="ri-shield-check-line" />
            120 verified catalog listings
          </span>

          <h1 className="max-w-3xl font-serif text-[2.7rem] leading-[.98] tracking-tight text-ink sm:text-6xl lg:text-[4.8rem]">
            Shop smarter.
            <br />
            <span className="italic font-normal text-plum">See the real story.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-7 text-ink-soft">
            ShopShield brings products, price signals, seller trust and review transparency
            together so you can make a better-informed purchase before you hit buy.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/collection/all" className="btn-primary rounded-xl !px-6">
              Explore the catalog <i className="ri-arrow-right-line" />
            </Link>
            <button onClick={() => setHowOpen(true)} className="btn-outline rounded-xl !px-6">
              <i className="ri-play-circle-line" /> How it works
            </button>
          </div>

          <div className="mt-9 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["120", "Listings"],
              ["4.6+", "Avg rating"],
              ["90+", "Trust signals"],
              ["24/7", "AI-ready"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-line bg-cream-soft/80 p-3.5">
                <p className="font-serif text-xl text-plum">{value}</p>
                <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-widest2 text-ink-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[600px]">
          <div className="rounded-[28px] border border-line bg-cream-soft p-3 shadow-soft">
            <div className="rounded-[22px] bg-ink p-5 text-cream sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-widest2 text-cream/50">ShopShield intelligence</p>
                  <h2 className="mt-1 font-serif text-2xl">Live catalog pulse</h2>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-sage/20 px-3 py-1.5 text-[9px] uppercase tracking-widest2 text-[#BFD7BF]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8FC18F]" /> Live
                </span>
              </div>

              <div className="mt-5 grid gap-3">
                {spotlight.map((p, index) => (
                  <Link
                    key={p.id}
                    to={`/product/catalog-${p.id}`}
                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.06] p-2.5 transition hover:bg-white/[.1]"
                  >
                    <img src={p.image} alt="" className="h-16 w-14 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] uppercase tracking-widest2 text-cream/45">{p.category}</span>
                        <span className="text-[10px] text-cream/50">#{index + 1}</span>
                      </div>
                      <h3 className="mt-1 line-clamp-1 text-[13px] font-medium">{p.name}</h3>
                      <div className="mt-1.5 flex items-center gap-3 text-[10px] text-cream/65">
                        <span><i className="ri-star-fill text-[#E8B86D]" /> {p.rating}</span>
                        <span>{formatPrice(p.price)}</span>
                        <span className="text-[#BFD7BF]">{p.sellerTrustScore} trust</span>
                      </div>
                    </div>
                    <i className="ri-arrow-right-up-line text-cream/40 transition group-hover:text-cream" />
                  </Link>
                ))}

                {spotlight.length === 0 && (
                  <div className="rounded-2xl border border-white/10 bg-white/[.05] p-8 text-center text-sm text-cream/60">
                    Loading the verified catalog…
                  </div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  ["ri-shield-check-line", "Seller trust"],
                  ["ri-price-tag-3-line", "Price drops"],
                  ["ri-chat-check-line", "Review signals"],
                ].map(([icon, label]) => (
                  <div key={label} className="rounded-xl bg-white/[.05] px-2 py-2.5 text-center">
                    <i className={`${icon} text-plum-light`} />
                    <p className="mt-1 text-[8px] uppercase tracking-widest2 text-cream/50">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-line bg-cream px-4 py-3 shadow-soft sm:block">
            <p className="text-[9px] uppercase tracking-widest2 text-ink-muted">Why ShopShield?</p>
            <p className="mt-1 text-xs font-semibold text-ink">Data first. Hype second.</p>
          </div>
        </div>
      </div>

      <HowItWorksModal open={howOpen} onClose={() => setHowOpen(false)} />
    </section>
  );
};

export default Hero;
