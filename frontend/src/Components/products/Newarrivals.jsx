import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../lib/format';
import { withFallback } from '../../lib/image';

const Newarrivals = () => {
  const scroll = useRef(null);
  const [scrolLeft, setscrolleft] = useState(false);
  const [scrollright, setscrollright] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollLeft = () => scroll.current?.scrollBy({ left: -320, behavior: 'smooth' });
  const scrollRight = () => scroll.current?.scrollBy({ left: 320, behavior: 'smooth' });

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrival`
        );
        if (Array.isArray(response.data)) {
          setNewArrivals(response.data);
        } else if (Array.isArray(response.data?.products)) {
          setNewArrivals(response.data.products);
        } else {
          setNewArrivals([]);
        }
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
        setNewArrivals([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNewArrivals();
  }, []);

  const updateScrollButtons = () => {
    const container = scroll.current;
    if (!container) return;
    setscrolleft(container.scrollLeft > 0);
    setscrollright(container.scrollLeft + container.clientWidth < container.scrollWidth - 4);
  };

  useEffect(() => {
    const container = scroll.current;
    if (!container) return;
    container.addEventListener('scroll', updateScrollButtons);
    updateScrollButtons();
    return () => container.removeEventListener('scroll', updateScrollButtons);
  }, [newArrivals]);

  if (!loading && newArrivals.length === 0) return null;

  return (
    <section className="py-16 md:py-20 border-b border-line">
      <div className="container-shop">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="section-eyebrow">Freshly Audited</p>
            <h2 className="section-title">Explore New Arrivals</h2>
            <p className="text-ink-muted mt-2 max-w-md">
              Discover the latest styles, freshly added and verified for your wardrobe.
            </p>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={scrollLeft}
              disabled={!scrolLeft}
              aria-label="Scroll left"
              className={`h-10 w-10 flex items-center justify-center border border-ink transition-colors ${
                scrolLeft ? 'text-ink hover:bg-ink hover:text-cream' : 'text-ink-muted/40 border-line cursor-not-allowed'
              }`}
            >
              <i className="ri-arrow-left-line" />
            </button>
            <button
              onClick={scrollRight}
              disabled={!scrollright}
              aria-label="Scroll right"
              className={`h-10 w-10 flex items-center justify-center border border-ink transition-colors ${
                scrollright ? 'text-ink hover:bg-ink hover:text-cream' : 'text-ink-muted/40 border-line cursor-not-allowed'
              }`}
            >
              <i className="ri-arrow-right-line" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scroll}
        className="container-shop overflow-x-auto flex gap-5 pb-2 scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="min-w-[80%] sm:min-w-[45%] lg:min-w-[24%] animate-pulse">
              <div className="aspect-[3/4] bg-sand-light" />
            </div>
          ))
        ) : (
          newArrivals.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="group min-w-[80%] sm:min-w-[45%] lg:min-w-[24%]"
            >
              <div className="aspect-[3/4] overflow-hidden bg-sand-light">
                <img
                  src={withFallback(product.images?.[0]?.url, product._id)}
                  alt={product.images?.[0]?.altText || product.name || 'Product image'}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-3">
                <h3 className="text-[15px] font-medium text-ink line-clamp-1">{product.name}</h3>
                <p className="text-ink-soft text-sm mt-0.5">{formatPrice(product.price)}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default Newarrivals;
