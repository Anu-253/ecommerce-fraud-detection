import React from "react";

const EditorialSection = ({ eyebrow, title, body, stats = [], tone = "cream", icon = "ri-shield-check-line" }) => {
  const dark = tone === "ink";
  return (
    <section className={`${dark ? "bg-ink text-cream" : "bg-cream-soft"} border-y border-line py-12 md:py-16`}>
      <div className="container-shop">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <p className={`section-eyebrow ${dark ? "!text-sand" : ""}`}>{eyebrow}</p>
            <h2 className={`section-title max-w-xl text-3xl md:text-5xl ${dark ? "!text-cream" : ""}`}>{title}</h2>
            <p className={`mt-5 max-w-xl text-[14px] leading-7 ${dark ? "text-cream/65" : "text-ink-soft"}`}>{body}</p>
          </div>

          <div className={`rounded-[28px] p-5 sm:p-7 ${dark ? "bg-white/[.06] border border-white/10" : "bg-cream border border-line"}`}>
            <div className="flex items-center gap-3 border-b border-current/10 pb-5">
              <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${dark ? "bg-plum text-cream" : "bg-plum-50 text-plum"}`}>
                <i className={`${icon} text-xl`} />
              </span>
              <div>
                <p className={`text-[9px] uppercase tracking-widest2 ${dark ? "text-cream/45" : "text-ink-muted"}`}>ShopShield signal</p>
                <p className={`mt-1 text-sm font-semibold ${dark ? "text-cream" : "text-ink"}`}>Clearer information before checkout.</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.label} className={`rounded-2xl p-4 ${dark ? "bg-white/[.05]" : "bg-sand-light/70"}`}>
                  <p className={`font-serif text-2xl ${dark ? "text-cream" : "text-plum"}`}>{s.value}</p>
                  <p className={`mt-1 text-[9px] uppercase leading-4 tracking-widest2 ${dark ? "text-cream/45" : "text-ink-muted"}`}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialSection;
