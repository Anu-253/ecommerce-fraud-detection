import React from 'react';

const Topbar = () => {
  return (
    <div className="bg-[#321326] px-4 py-2.5 text-center text-xs text-white">
      <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-2">
        <span className="font-medium tracking-wide">
          Shop smarter. Shop with confidence.
        </span>

        <span className="hidden sm:inline text-white/40">•</span>

        <span className="hidden sm:inline text-white/70">
          Secure shopping & trusted products
        </span>
      </div>
    </div>
  );
};

export default Topbar;
