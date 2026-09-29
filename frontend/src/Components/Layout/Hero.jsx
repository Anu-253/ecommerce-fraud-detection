import React, { useState } from 'react';
// Close-up boutique clothing rack photograph (Unsplash, free-to-use license — unsplash.com/license),
// chosen because it fills the frame edge-to-edge with garments — no window/floor negative space.
const heroimg =
  'https://images.unsplash.com/photo-1737748612418-e39bcd6503a2?auto=format&fit=crop&w=1600&q=80';
import { Link } from 'react-router-dom';
import HowItWorksModal from '../Common/HowItWorksModal';

const CHECKLIST = [
  { icon: 'ri-shield-check-line', label: 'Real, verified reviews' },
  { icon: 'ri-price-tag-3-line', label: 'Transparent pricing, real history' },
  { icon: 'ri-user-star-line', label: 'Scored, trusted sellers' },
  { icon: 'ri-lock-line', label: 'Escrow fraud protection' },
];

const Hero = () => {
  const [howOpen, setHowOpen] = useState(false);

  return (
    <section className="relative overflow-hidden">
      <div className="container-shop grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pt-12 pb-8 md:pt-20 md:pb-10">
        {/* Text */}
        <div className="order-2 lg:order-1">
          <span className="pill mb-6">
            <i className="ri-shield-check-line text-plum" />
            ShopShield Verified Fashion
          </span>

          <h1 className="font-serif text-[2.6rem] leading-[1.05] sm:text-6xl md:text-[4.2rem] text-ink text-balance">
            Shop Smarter.
            <br />
            <span className="italic font-normal text-plum">Know What You're Buying.</span>
          </h1>

          <p className="mt-6 max-w-md text-ink-soft leading-relaxed">
            Real reviews. Transparent prices. Trusted sellers. Secure shopping — every garment
            audited for physical fabric accuracy and protected with escrow fraud shielding.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/collection/all" className="btn-primary">
              Explore Collection <i className="ri-arrow-right-line" />
            </Link>
            <button onClick={() => setHowOpen(true)} className="btn-outline">
              <i className="ri-play-circle-line" /> How It Works
            </button>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 max-w-sm">
            {CHECKLIST.map((c) => (
              <li key={c.label} className="flex items-center gap-2 text-ink-soft text-[13px]">
                <i className={`${c.icon} text-plum`} />
                {c.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Image */}
        <div className="order-1 lg:order-2 relative">
          <div className="relative aspect-[3/2] w-full overflow-hidden">
            <img src={heroimg} alt="ShopShield verified fashion" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>

      <HowItWorksModal open={howOpen} onClose={() => setHowOpen(false)} />
    </section>
  );
};

export default Hero;
