import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Newarrivals = () => {
  const scroll = useRef(null);

  const [scrolLeft, setscrolleft] = useState(false);
  const [scrollright, setscrollright] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollLeft = () => {
    if (scroll.current) {
      scroll.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scroll.current) {
      scroll.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrival`
        );

        console.log('New arrivals response:', response.data);

        // Backend normally returns an array.
        // This also handles { products: [...] } if the API changes.
        if (Array.isArray(response.data)) {
          setNewArrivals(response.data);
        } else if (Array.isArray(response.data?.products)) {
          setNewArrivals(response.data.products);
        } else {
          console.error(
            'Unexpected new arrivals response:',
            response.data
          );
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

    setscrollright(
      container.scrollLeft + container.clientWidth <
        container.scrollWidth
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
    <section className="py-10">
      {/* Section heading */}
      <div className="container mb-10 mx-auto text-center relative px-4">
        <h2 className="text-3xl font-bold mb-4">
          Explore New Arrivals
        </h2>

        <p className="text-lg text-black mb-8">
          Discover the latest styles of runway, freshly added to your wardrobe.
        </p>

        {/* Scroll buttons */}
        <div className="absolute right-4 bottom-[-30px] flex space-x-2">
          <button
            onClick={scrollLeft}
            disabled={!scrolLeft}
            className={`p-2 rounded border ${
              scrolLeft
                ? 'bg-black text-white'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
            aria-label="Scroll left"
          >
            <i className="ri-arrow-left-double-line"></i>
          </button>

          <button
            onClick={scrollRight}
            disabled={!scrollright}
            className={`p-2 rounded border ${
              scrollright
                ? 'bg-black text-white'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
            aria-label="Scroll right"
          >
            <i className="ri-arrow-right-double-line"></i>
          </button>
        </div>
      </div>

      {/* Products */}
      <div
        ref={scroll}
        className="container mx-auto overflow-x-auto flex space-x-6 px-4 pb-4 scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {loading ? (
          <div className="w-full text-center py-10 text-gray-500">
            Loading new arrivals...
          </div>
        ) : newArrivals.length > 0 ? (
          newArrivals.map((product) => (
            <div
              key={product._id}
              className="min-w-[100%] relative sm:min-w-[50%] lg:min-w-[30%]"
            >
              <Link to={`/product/${product._id}`}>
                <div className="w-full h-[300px] flex items-center justify-center bg-white rounded-xl shadow-md overflow-hidden">
                  <img
                    src={product.images?.[0]?.url}
                    alt={
                      product.images?.[0]?.altText ||
                      product.name ||
                      'Product image'
                    }
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="mt-3 text-left">
                  <h3 className="font-semibold text-lg">
                    {product.name}
                  </h3>

                  <p className="text-gray-600">
                    ₹{product.price}
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="w-full text-center py-10 text-gray-500">
            No new arrivals available at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default Newarrivals;
