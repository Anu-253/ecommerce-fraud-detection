import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeWishlistItem, clearWishlist } from "../../Redux/slice/wishlistSlice";
import { formatPrice } from "../lib/format";
import EmptyState from "../Components/Common/EmptyState";

const Wishlist = () => {
  const items = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div className="container-shop py-10 md:py-14">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="section-eyebrow">Saved for later</p>
          <h1 className="section-title">Your Wishlist</h1>
        </div>
        {items.length > 0 && (
          <button
            onClick={() => dispatch(clearWishlist())}
            className="text-[11px] uppercase tracking-widest2 text-plum hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon="ri-heart-line"
          title="Your wishlist is empty"
          body="Tap the heart on any product to save it here for later."
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {items.map((item) => (
            <div key={item.id} className="group relative flex flex-col">
              <Link to={item.href} className="block relative aspect-[3/4] overflow-hidden bg-sand-light">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </Link>
              <button
                onClick={() => dispatch(removeWishlistItem(item.id))}
                aria-label="Remove from wishlist"
                className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-cream/90 hover:bg-cream"
              >
                <i className="ri-heart-fill text-plum text-[15px]" />
              </button>
              <div className="pt-3">
                <Link to={item.href}>
                  <h3 className="text-[15px] text-ink font-medium line-clamp-2 hover:text-plum transition-colors">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-[15px] text-ink font-semibold mt-1">{formatPrice(item.price)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
