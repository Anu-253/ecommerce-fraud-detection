import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiUser,
  FiShoppingBag,
  FiMenu,
  FiX,
  FiHeart,
  FiSearch,
  FiChevronDown,
} from 'react-icons/fi';
import { useSelector } from 'react-redux';

import Search from './Search';
import CartDrawer from '../Layout/CartDrawer';

const Navbar = () => {
  const [draweropen, setdraweropen] = useState(false);
  const [menuopen, setmenuopen] = useState(false);

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce(
      (total, product) => total + product.quantity,
      0
    ) || 0;

  const handleCartDrawer = () => {
    setdraweropen(!draweropen);
  };

  const handleMenuOpen = () => {
    setmenuopen(!menuopen);
  };

  return (
    <>
      {/* MAIN HEADER */}
      <header className="sticky top-0 z-40 bg-[#fbf8f4]">

        {/* TOP ROW */}
        <div className="border-b border-[#24161d]/10">
          <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between px-5 sm:px-8">

            {/* MOBILE MENU */}
            <button
              onClick={handleMenuOpen}
              className="rounded-full p-2 lg:hidden"
              type="button"
              aria-label="Open menu"
            >
              <FiMenu size={23} />
            </button>

            {/* DESKTOP LEFT */}
            <div className="hidden items-center gap-7 lg:flex">
              <Link
                to="/collection/all?gender=Women"
                className="text-xs font-semibold uppercase tracking-[0.18em] transition hover:text-[#7b315f]"
              >
                Women
              </Link>

              <Link
                to="/collection/all?gender=Men"
                className="text-xs font-semibold uppercase tracking-[0.18em] transition hover:text-[#7b315f]"
              >
                Men
              </Link>

              <Link
                to="/collection/all?category=Top+Wear"
                className="text-xs font-semibold uppercase tracking-[0.18em] transition hover:text-[#7b315f]"
              >
                Clothing
              </Link>

              <Link
                to="/collection/all"
                className="flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] transition hover:text-[#7b315f]"
              >
                Collections
                <FiChevronDown size={13} />
              </Link>
            </div>

            {/* LOGO */}
            <Link
              to="/"
              className="absolute left-1/2 -translate-x-1/2 text-center"
            >
              <div className="font-serif text-2xl font-bold tracking-[0.08em] text-[#321326] sm:text-3xl">
                SHOPSHIELD
              </div>

              <div className="mt-1 text-[7px] font-semibold uppercase tracking-[0.38em] text-[#7b315f]">
                Fashion · Trust · You
              </div>
            </Link>

            {/* RIGHT */}
            <div className="ml-auto flex items-center gap-1 sm:gap-3">

              {/* SEARCH */}
              <div className="hidden xl:block">
                <Search />
              </div>

              <button
                type="button"
                className="hidden rounded-full p-2.5 transition hover:bg-[#eee5e8] sm:block"
                aria-label="Search"
              >
                <FiSearch size={19} />
              </button>

              {/* WISHLIST */}
              <button
                type="button"
                className="hidden rounded-full p-2.5 transition hover:bg-[#eee5e8] sm:block"
                aria-label="Wishlist"
              >
                <FiHeart size={19} />
              </button>

              {/* ACCOUNT */}
              <Link
                to="/profile"
                className="rounded-full p-2.5 transition hover:bg-[#eee5e8]"
                aria-label="Account"
              >
                <FiUser size={20} />
              </Link>

              {/* CART */}
              <button
                onClick={handleCartDrawer}
                type="button"
                className="relative rounded-full p-2.5 transition hover:bg-[#eee5e8]"
                aria-label="Shopping bag"
              >
                <FiShoppingBag size={20} />

                {cartItemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#321326] px-1 text-[9px] font-bold text-white">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* ADMIN */}
              {user && user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="hidden rounded-full bg-[#321326] px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white lg:block"
                >
                  Admin
                </Link>
              )}

            </div>
          </div>
        </div>

        {/* DESKTOP CATEGORY BAR */}
        <div className="hidden border-b border-[#24161d]/10 bg-[#fbf8f4] lg:block">
          <div className="mx-auto flex h-12 max-w-[1500px] items-center justify-center gap-10">

            <Link
              to="/collection/all"
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-600 transition hover:text-[#321326]"
            >
              New Arrivals
            </Link>

            <Link
              to="/collection/all?category=Top+Wear"
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-600 transition hover:text-[#321326]"
            >
              Tops
            </Link>

            <Link
              to="/collection/all?category=Bottom+Wear"
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-600 transition hover:text-[#321326]"
            >
              Bottoms
            </Link>

            <Link
              to="/collection/all?category=Dresses"
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-600 transition hover:text-[#321326]"
            >
              Dresses
            </Link>

            <Link
              to="/collection/all?category=Outer+Wear"
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-600 transition hover:text-[#321326]"
            >
              Outerwear
            </Link>

            <Link
              to="/collection/all?category=Accessories"
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-600 transition hover:text-[#321326]"
            >
              Accessories
            </Link>

            <Link
              to="/collection/all"
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7b315f] transition hover:text-[#321326]"
            >
              All Collections
            </Link>

          </div>
        </div>

      </header>

      {/* CART */}
      <CartDrawer
        draweropen={draweropen}
        handlecartdrawer={handleCartDrawer}
      />

      {/* MOBILE OVERLAY */}
      {menuopen && (
        <div
          onClick={handleMenuOpen}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* MOBILE MENU */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-[88%] max-w-[390px] flex-col bg-[#fbf8f4] shadow-2xl transition-transform duration-300 lg:hidden ${
          menuopen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >

        {/* MOBILE HEADER */}
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-6">

          <Link
            to="/"
            onClick={handleMenuOpen}
            className="font-serif text-xl font-bold tracking-wide text-[#321326]"
          >
            SHOPSHIELD
          </Link>

          <button
            onClick={handleMenuOpen}
            type="button"
            className="rounded-full p-2 hover:bg-[#eee5e8]"
          >
            <FiX size={23} />
          </button>

        </div>

        {/* MOBILE SEARCH */}
        <div className="border-b border-black/10 px-6 py-5">
          <Search />
        </div>

        {/* MOBILE LINKS */}
        <nav className="flex flex-col px-6 py-8">

          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#7b315f]">
            Shop
          </p>

          <MobileLink
            to="/collection/all"
            label="New Arrivals"
            close={handleMenuOpen}
          />

          <MobileLink
            to="/collection/all?gender=Women"
            label="Women"
            close={handleMenuOpen}
          />

          <MobileLink
            to="/collection/all?gender=Men"
            label="Men"
            close={handleMenuOpen}
          />

          <MobileLink
            to="/collection/all?category=Top+Wear"
            label="Tops"
            close={handleMenuOpen}
          />

          <MobileLink
            to="/collection/all?category=Bottom+Wear"
            label="Bottoms"
            close={handleMenuOpen}
          />

          <MobileLink
            to="/collection/all?category=Dresses"
            label="Dresses"
            close={handleMenuOpen}
          />

          <MobileLink
            to="/collection/all"
            label="All Collections"
            close={handleMenuOpen}
          />

        </nav>

        {/* MOBILE FOOTER */}
        <div className="mt-auto border-t border-black/10 p-6">

          <Link
            to="/profile"
            onClick={handleMenuOpen}
            className="flex items-center gap-3 text-sm font-semibold"
          >
            <FiUser size={18} />
            My Account
          </Link>

          {user && user.role === 'admin' && (
            <Link
              to="/admin"
              onClick={handleMenuOpen}
              className="mt-5 block text-sm font-semibold"
            >
              Admin Dashboard
            </Link>
          )}

        </div>

      </aside>
    </>
  );
};

const MobileLink = ({ to, label, close }) => {
  return (
    <Link
      to={to}
      onClick={close}
      className="border-b border-black/10 py-5 font-serif text-2xl text-[#321326] transition hover:pl-2"
    >
      {label}
    </Link>
  );
};

export default Navbar;
