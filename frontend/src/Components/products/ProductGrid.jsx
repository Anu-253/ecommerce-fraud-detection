import React from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiArrowUpRight } from "react-icons/fi";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="animate-pulse">
            <div className="aspect-[3/4] rounded-[26px] bg-[#e9e3de]" />
            <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
            <div className="mt-3 h-4 w-1/3 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[24px] bg-white p-10 text-center text-sm text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="rounded-[24px] border border-black/5 bg-white p-12 text-center">
        <p className="font-serif text-2xl text-[#321326]">
          Products coming soon
        </p>

        <p className="mt-2 text-sm text-gray-500">
          New styles will appear here once they're available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => {
        if (
          !product?._id ||
          !product?.name ||
          product?.price === undefined ||
          !product?.images?.[0]?.url
        ) {
          return null;
        }

        const image = product.images[0].url;

        const originalPrice =
          product.originalprice ||
          product.originalPrice ||
          null;

        return (
          <article key={product._id} className="group">
            <div className="relative overflow-hidden rounded-[26px] bg-[#eee9e5]">

              {/* PRODUCT IMAGE */}
              <Link to={`/product/${product._id}`}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={image}
                    alt={product.images[0].altText || product.name}
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                </div>
              </Link>

              {/* NEW BADGE */}
              <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#321326]">
                New
              </span>

              {/* WISHLIST */}
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#321326] shadow-sm transition duration-300 hover:scale-110"
                aria-label="Wishlist"
              >
                <FiHeart size={17} />
              </button>

              {/* VIEW PRODUCT */}
              <Link
                to={`/product/${product._id}`}
                className="absolute bottom-4 left-4 right-4 flex translate-y-3 items-center justify-between rounded-xl bg-white px-4 py-3 text-xs font-bold text-[#321326] opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
              >
                <span>View Product</span>
                <FiArrowUpRight size={16} />
              </Link>
            </div>

            {/* PRODUCT INFO */}
            <div className="px-1 pt-4">
              <Link to={`/product/${product._id}`}>
                <h3 className="line-clamp-1 text-sm font-semibold text-[#21151b]">
                  {product.name}
                </h3>
              </Link>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-bold text-[#321326]">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </span>

                {originalPrice &&
                  Number(originalPrice) > Number(product.price) && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹{Number(originalPrice).toLocaleString("en-IN")}
                    </span>
                  )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ProductGrid;
