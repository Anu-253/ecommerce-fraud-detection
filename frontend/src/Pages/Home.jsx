import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiShield,
  FiTag,
  FiLock,
  FiTruck,
  FiHeart,
} from 'react-icons/fi';

import Hero from '../Components/Layout/Hero';
import ProductGrid from '../Components/products/ProductGrid';
import Newarrivals from '../Components/products/Newarrivals';
import ProductsDetails from '../Components/products/productsDetails';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../../Redux/slice/productsSlice';

const Home = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        gender: 'Women',
        category: 'Bottom Wear',
        limit: 8,
      })
    );

    const getBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );

        setBestSellerProduct(response.data);
      } catch (error) {
        console.log('Best seller unavailable');
      }
    };

    getBestSeller();
  }, [dispatch]);

  const categories = [
    {
      name: 'Women',
      image:
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85',
      link: '/collection/all?gender=Women',
    },
    {
      name: 'Men',
      image:
        'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=700&q=85',
      link: '/collection/all?gender=Men',
    },
    {
      name: 'Top Wear',
      image:
        'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=85',
      link: '/collection/all?category=Top+Wear',
    },
    {
      name: 'Bottom Wear',
      image:
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=85',
      link: '/collection/all?category=Bottom+Wear',
    },
    {
      name: 'Dresses',
      image:
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85',
      link: '/collection/all?category=Dresses',
    },
  ];

  const features = [
    {
      icon: FiTruck,
      title: 'Fast Delivery',
      text: 'Quick & reliable',
    },
    {
      icon: FiShield,
      title: 'Trusted Products',
      text: 'Shop with confidence',
    },
    {
      icon: FiTag,
      title: 'Better Prices',
      text: 'Great everyday value',
    },
    {
      icon: FiLock,
      title: 'Secure Shopping',
      text: 'Safe checkout',
    },
  ];

  return (
    <main className="bg-[#f7f3ef] text-[#24161d]">

      {/* HERO */}
      <Hero />

      {/* TRUST BAR */}
      <section className="border-b border-[#24161d]/10 bg-[#fffdfb]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 lg:grid-cols-4">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={`flex items-center gap-4 px-5 py-6 sm:px-8 ${
                  index !== features.length - 1
                    ? 'border-r border-[#24161d]/10'
                    : ''
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f0e5ea] text-[#5a2141]">
                  <Icon size={19} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide sm:text-sm">
                    {feature.title}
                  </p>

                  <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
                    {feature.text}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">

        <div className="mb-10 flex items-end justify-between">

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7b315f]">
              Discover your style
            </p>

            <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
              Shop by category
            </h2>
          </div>

          <Link
            to="/collection/all"
            className="hidden items-center gap-2 text-sm font-semibold sm:flex"
          >
            View all
            <FiArrowUpRight />
          </Link>

        </div>

        <div className="flex gap-8 overflow-x-auto pb-5 scrollbar-hide">

          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className="group min-w-[125px] text-center"
            >

              <div className="mx-auto h-[125px] w-[125px] overflow-hidden rounded-full border-4 border-white shadow-sm">

                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

              </div>

              <p className="mt-4 text-sm font-semibold">
                {category.name}
              </p>

            </Link>
          ))}

        </div>
      </section>

      {/* EDITORIAL BANNER */}
      <section className="mx-5 mb-20 sm:mx-8">

        <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[32px] bg-[#321326]">

          <img
            src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1800&q=85"
            alt="Fashion collection"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#321326] via-[#321326]/75 to-transparent" />

          <div className="relative flex min-h-[460px] items-center px-7 py-16 sm:px-12 lg:px-20">

            <div className="max-w-xl text-white">

              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#e8cedb]">
                The ShopShield edit
              </p>

              <h2 className="mt-5 font-serif text-5xl leading-[0.95] sm:text-6xl">
                Fashion that feels
                <br />
                like you.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/70">
                Explore carefully selected styles made for everyday moments,
                special occasions and everything in between.
              </p>

              <Link
                to="/collection/all"
                className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-bold text-[#321326] transition hover:bg-[#f1e6eb]"
              >
                Explore collection
                <FiArrowRight />
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">

        <div className="mb-10 flex items-end justify-between">

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7b315f]">
              Curated for you
            </p>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              Available now
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Discover styles currently available in the collection.
            </p>
          </div>

          <Link
            to="/collection/all"
            className="hidden items-center gap-2 text-sm font-semibold sm:flex"
          >
            Shop all
            <FiArrowUpRight />
          </Link>

        </div>

        <ProductGrid
          products={products}
          loading={loading}
          error={error}
        />

      </section>

      {/* THREE PROMO CARDS */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">

        <div className="grid gap-6 md:grid-cols-3">

          <PromoCard
            title="Everyday essentials"
            text="Simple pieces. Easy styling."
            image="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85"
          />

          <PromoCard
            title="New season"
            text="Fresh looks worth discovering."
            image="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=85"
          />

          <PromoCard
            title="Complete the look"
            text="Finishing touches for every outfit."
            image="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85"
          />

        </div>

      </section>

      {/* NEW ARRIVALS */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">

        <div className="mb-10">

          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7b315f]">
            Just dropped
          </p>

          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            New arrivals
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Fresh styles added to ShopShield.
          </p>

        </div>

        <Newarrivals />

      </section>

      {/* TRUST CTA */}
      <section className="mx-5 mb-16 sm:mx-8">

        <div className="mx-auto max-w-[1400px] rounded-[32px] bg-[#321326] px-7 py-16 text-center text-white sm:px-12">

          <div className="mx-auto max-w-2xl">

            <FiHeart className="mx-auto mb-5 text-[#e6cbd8]" size={26} />

            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#e6cbd8]">
              The ShopShield promise
            </p>

            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
              Shop with confidence.
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/65">
              Fashion discovery meets a safer shopping experience.
              Find products, explore collections and shop at your own pace.
            </p>

            <Link
              to="/collection/all"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-7 py-4 text-sm font-bold text-[#321326] transition hover:bg-[#f2e7ec]"
            >
              Start shopping
              <FiArrowRight />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
};

const PromoCard = ({ title, text, image }) => {
  return (
    <Link
      to="/collection/all"
      className="group relative min-h-[390px] overflow-hidden rounded-[30px]"
    >

      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      <div className="absolute bottom-7 left-7 right-7 text-white">

        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
          ShopShield collection
        </p>

        <h3 className="mt-2 font-serif text-3xl">
          {title}
        </h3>

        <div className="mt-4 flex items-center gap-2 text-xs font-semibold">
          {text}
          <FiArrowUpRight />
        </div>

      </div>

    </Link>
  );
};

export default Home;
