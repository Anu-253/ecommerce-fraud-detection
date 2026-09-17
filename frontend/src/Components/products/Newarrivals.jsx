import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiHeart, FiArrowUpRight } from 'react-icons/fi';

const Newarrivals = () => {
  const scroll = useRef(null);

  const [scrolLeft, setscrolleft] = useState(false);
  const [scrollright, setscrollright] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);

  const scrollLeft = () => {
    if (scroll.current) {
      scroll.current.scrollBy({
        left: -350,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scroll.current) {
      scroll.current.scrollBy({
        left: 350,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrival`
        );

        if (Array.isArray(response.data)) {
          setNewArrivals(response.data);
        } else if (Array.isArray(response.data?.products)) {
          setNewArrivals(response.data.products);
        } else {
          console.error('Unexpected new arrivals response:', response.data);
          setNewArrivals([]);
        }
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
        setNewArrivals([]);
      }
    };

    fetchNewArrivals();
  }, []);

  const updateScrollButtons = () => {
    const container = scroll.current;

    if (!container) return;

    setscrolleft(container.scrollLeft > 0);

    setscrollright(
      container.scrollLeft + container.clientWidth < container.scrollWidth
    );
  };

  useEffect(() => {
    const container = scroll.current;

    if (!container) return;

    container.addEventListener('scroll', updateScrollButtons);
    updateScrollButtons();

    return () => {
      container.removeEventListener('scroll', updateScrollButtons);
    };
  }, [newArrivals]);

  return (
    <section>
      {/* Product carousel */}
      <div
        ref={scroll}
        className="mx-auto flex max-w-[1400px] gap-5 overflow-x-auto px-4 pb-6 scrollbar-hide sm:px-6"
        style={{ scrollBehavior: 'smooth' }}
      >
        {newArrivals.length > 0 ? (
          newArrivals.map((product) => (
            <div
              key={product._id}
              className="group min-w-[82%] sm:min-w-[45%] lg:min-w-[31%]"
            >
              <div className="relative overflow-hidden rounded-[24px] bg-[#f1ede9]">
                {/* Image */}
                <Link to={`/product/${product._id}`}>
                  <div className="flex h-[390px] items-center justify-center overflow-hidden">
                    <img
                      src={product.images?.[0]?.url}
                      alt={
                        product.images?.[0]?.altText ||
                        product.name ||
                        'Product image'
                      }
                      className="h-full w-full object-contain p-4 transition duration-700 group-hover:scale-105"
                    />
                  </div>
                </Link>

                {/* New badge */}
                <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#321326] shadow-sm">
                  New
                </div>

                {/* Wishlist */}
                <button
                  type="button"
                  aria-label="Add to wishlist"
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#321326] shadow-sm transition hover:scale-105"
                >
                  <FiHeart size={17} />
                </button>

                {/* View button */}
                <Link
                  to={`/product/${product._id}`}
                  className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-white/95 px-4 py-3 text-sm font-semibold text-[#321326] opacity-0 shadow-sm backdrop-blur transition duration-300 group-hover:opacity-100"
                >
                  <span>View Product</span>
                  <FiArrowUpRight size={18} />
                </Link>
              </div>

              {/* Product information */}
              <div className="px-1 pt-4">
                <Link to={`/product/${product._id}`}>
                  <h3 className="line-clamp-1 text-sm font-semibold text-[#21151b] transition hover:text-[#7b315f]">
                    {product.name || 'Product'}
                  </h3>
                </Link>

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-[#321326]">
                    ₹{Number(product.price || 0).toLocaleString('en-IN')}
                  </p>

                  <span className="text-xs text-gray-400">
                    New arrival
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full py-10 text-center text-sm text-gray-500">
            No new arrivals available at the moment.
          </div>
        )}
      </div>

      {/* Carousel controls */}
      <div className="mx-auto mt-2 flex max-w-[1400px] justify-end gap-2 px-4 sm:px-6">
        <button
          onClick={scrollLeft}
          disabled={!scrolLeft}
          aria-label="Scroll left"
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition ${
            scrolLeft
              ? 'border-[#321326] bg-[#321326] text-white hover:bg-[#54203f]'
              : 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-300'
          }`}
        >
          <FiArrowLeft size={18} />
        </button>

        <button
          onClick={scrollRight}
          disabled={!scrollright}
          aria-label="Scroll right"
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition ${
            scrollright
              ? 'border-[#321326] bg-[#321326] text-white hover:bg-[#54203f]'
              : 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-300'
          }`}
        >
          <FiArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default Newarrivals;
