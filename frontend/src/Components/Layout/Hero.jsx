import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield, FiCheck } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="bg-[#f7f3ef]">

      <div className="mx-auto grid min-h-[620px] max-w-[1500px] grid-cols-1 lg:grid-cols-2">

        {/* LEFT CONTENT */}
        <div className="flex items-center px-7 py-16 sm:px-12 lg:px-16 xl:px-24">

          <div className="max-w-xl">

            <p className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.35em] text-[#7b315f]">
              <span className="h-px w-10 bg-[#7b315f]" />
              The ShopShield Edit
            </p>

            <h1 className="font-serif text-6xl leading-[0.9] tracking-tight text-[#321326] sm:text-7xl xl:text-8xl">
              Style
              <br />
              meets
              <br />
              confidence.
            </h1>

            <p className="mt-8 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
              Discover fashion you'll love, with a shopping experience
              designed around trust, transparency and confidence.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">

              <Link
                to="/collection/all"
                className="group inline-flex items-center gap-3 bg-[#321326] px-7 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#54203f]"
              >
                Shop Collection
                <FiArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/collection/all"
                className="inline-flex items-center border border-[#321326]/20 px-7 py-4 text-xs font-bold uppercase tracking-[0.15em] text-[#321326] transition hover:bg-white"
              >
                Explore
              </Link>

            </div>

            {/* SMALL TRUST ROW */}
            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-4 border-t border-[#321326]/10 pt-6">

              <div className="flex items-center gap-2">
                <FiShield className="text-[#7b315f]" size={17} />
                <span className="text-[10px] font-semibold uppercase tracking-wider">
                  Trusted shopping
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FiCheck className="text-[#7b315f]" size={17} />
                <span className="text-[10px] font-semibold uppercase tracking-wider">
                  Secure checkout
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative min-h-[520px] overflow-hidden lg:min-h-full">

          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=90"
            alt="ShopShield fashion collection"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* IMAGE GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

          {/* IMAGE LABEL */}
          <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-white">

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/70">
                ShopShield
              </p>

              <p className="mt-2 font-serif text-2xl">
                New season. New you.
              </p>
            </div>

            <div className="hidden text-right sm:block">
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/60">
                SS / 26
              </p>

              <p className="mt-1 text-xs">
                Collection
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;
