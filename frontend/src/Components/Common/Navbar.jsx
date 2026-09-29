import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartDrawer from "../Layout/CartDrawer";
import SearchOverlay from "./SearchOverlay";

const PRIMARY_LINKS = [
  { label: "Women", to: "/collection/all?gender=Women" },
  { label: "Men", to: "/collection/all?gender=Men" },
  { label: "Accessories", to: "/collection/all?category=Accessories" },
  { label: "Collections", to: "/collections" },
];

const MORE_LINKS = [
  { label: "Dresses", to: "/collection/all?category=Dresses" },
  { label: "Top Wear", to: "/collection/all?category=Top+Wear" },
  { label: "Bottom Wear", to: "/collection/all?category=Bottom+Wear" },
  { label: "Outerwear", to: "/collection/all?category=Outerwear" },
  { label: "All Collections", to: "/collection/all" },
];

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

  useEffect(() => {
    const onClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <>
      <nav className="container-shop flex items-center justify-between py-4">
        {/* Logo lockup */}
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center bg-plum text-cream font-serif text-lg">
            S
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-xl tracking-tight text-ink">SHOPSHIELD</span>
            <span className="text-[9.5px] tracking-widest2 uppercase text-ink-muted mt-0.5">
              Shop Smarter. Shop Safer.
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {PRIMARY_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-[12.5px] tracking-widest2 uppercase text-ink-soft hover:text-plum transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen((v) => !v)}
              className="flex items-center gap-1 text-[12.5px] tracking-widest2 uppercase text-ink-soft hover:text-plum transition-colors"
            >
              More <i className={`ri-arrow-down-s-line transition-transform ${moreOpen ? "rotate-180" : ""}`} />
            </button>

            {moreOpen && (
              <div className="absolute left-0 top-full mt-3 w-52 bg-cream-soft border border-line shadow-soft py-2 z-40">
                {MORE_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMoreOpen(false)}
                    className="block px-4 py-2.5 text-[12.5px] text-ink-soft hover:bg-cream-deep hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-1">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="hidden sm:inline-flex mr-2 border border-ink px-3 py-1.5 text-[11px] tracking-widest2 uppercase hover:bg-ink hover:text-cream transition-colors"
            >
              Admin
            </Link>
          )}

          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="p-2.5 text-ink hover:text-plum transition-colors"
          >
            <i className="ri-search-line text-lg" />
          </button>

          <Link to="/wishlist" aria-label="Wishlist" className="relative p-2.5 text-ink hover:text-plum transition-colors">
            <i className="ri-heart-line text-lg" />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-plum text-[9.5px] text-cream">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/profile" aria-label="Account" className="p-2.5 text-ink hover:text-plum transition-colors">
            <i className="ri-user-line text-lg" />
          </Link>

          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Cart"
            className="relative p-2.5 text-ink hover:text-plum transition-colors"
          >
            <i className="ri-shopping-bag-3-line text-lg" />
            {cartItemCount > 0 && (
              <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-plum text-[9.5px] text-cream">
                {cartItemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Menu"
            className="p-2.5 text-ink hover:text-plum transition-colors lg:hidden"
          >
            <i className="ri-menu-3-line text-lg" />
          </button>
        </div>
      </nav>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer draweropen={drawerOpen} handlecartdrawer={() => setDrawerOpen(!drawerOpen)} />

      {/* Mobile menu */}
      <div
        className={`fixed left-0 top-0 z-50 flex h-full w-3/4 flex-col bg-cream-soft shadow-xl transition-transform duration-300 sm:w-1/2 md:w-[26rem] overflow-y-auto
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <i className="ri-close-line text-2xl text-ink" />
          </button>
        </div>

        <div className="px-8 pb-10">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="mb-10 block font-serif text-2xl text-ink"
          >
            SHOPSHIELD
          </Link>

          <div className="flex flex-col gap-5">
            {[...PRIMARY_LINKS, ...MORE_LINKS].map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="text-[13px] tracking-widest2 uppercase text-ink-soft hover:text-plum"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="text-[13px] tracking-widest2 uppercase text-ink-soft hover:text-plum">
              Wishlist
            </Link>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/30"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
