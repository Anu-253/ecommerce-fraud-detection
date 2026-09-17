import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiArrowUpRight,
  FiMail,
  FiPhone,
} from 'react-icons/fi';

const Footer = () => {
  const handleNewsletter = (event) => {
    event.preventDefault();
  };

  return (
    <footer className="bg-[#321326] text-white">

      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-[1500px] px-6 py-16 sm:px-8 lg:py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND / NEWSLETTER */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="font-serif text-3xl font-bold tracking-wide"
            >
              SHOPSHIELD
            </Link>

            <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.35em] text-[#d8b9c8]">
              Fashion · Trust · You
            </p>

            <p className="mt-7 max-w-xs text-sm leading-7 text-white/60">
              Discover fashion you'll love with a shopping experience
              designed around trust and confidence.
            </p>

            <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.2em]">
              Stay in the loop
            </h3>

            <form
              onSubmit={handleNewsletter}
              className="mt-4 flex max-w-sm"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="min-w-0 flex-1 rounded-l-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-r-xl bg-white px-5 text-xs font-bold uppercase tracking-wider text-[#321326] transition hover:bg-[#eadde3]"
              >
                Join
                <FiArrowUpRight size={14} />
              </button>
            </form>

            <p className="mt-3 text-[11px] text-white/40">
              Sign up for updates, new arrivals and offers.
            </p>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#d8b9c8]">
              Shop
            </h3>

            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  to="/collection/all"
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  New Arrivals
                </Link>
              </li>

              <li>
                <Link
                  to="/collection/all?gender=Women"
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  Women
                </Link>
              </li>

              <li>
                <Link
                  to="/collection/all?gender=Men"
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  Men
                </Link>
              </li>

              <li>
                <Link
                  to="/collection/all?category=Top+Wear"
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  Top Wear
                </Link>
              </li>

              <li>
                <Link
                  to="/collection/all?category=Bottom+Wear"
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  Bottom Wear
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#d8b9c8]">
              Support
            </h3>

            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  FAQs
                </Link>
              </li>

              <li>
                <Link
                  to="/features"
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#d8b9c8]">
              Connect
            </h3>

            <div className="mt-6 flex gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:bg-white hover:text-[#321326]"
              >
                <FiFacebook size={17} />
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:bg-white hover:text-[#321326]"
              >
                <FiInstagram size={17} />
              </a>

              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:bg-white hover:text-[#321326]"
              >
                <FiTwitter size={17} />
              </a>
            </div>

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3 text-sm text-white/65">
                <FiMail className="text-[#d8b9c8]" />
                support@shopshield.com
              </div>

              <div className="flex items-center gap-3 text-sm text-white/65">
                <FiPhone className="text-[#d8b9c8]" />
                +91 98675 46783
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-3 px-6 py-6 text-center sm:px-8 md:flex-row md:text-left">

          <p className="text-xs text-white/40">
            © 2026 ShopShield. All rights reserved.
          </p>

          <p className="text-xs text-white/40">
            Fashion · Trust · Confidence
          </p>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
