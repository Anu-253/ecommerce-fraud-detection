import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistItem } from "../../../Redux/slice/wishlistSlice";

const WishlistButton = ({ item, className = "" }) => {
  const dispatch = useDispatch();
  const isSaved = useSelector((state) => state.wishlist.items.some((i) => i.id === item.id));

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleWishlistItem(item));
      }}
      aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={isSaved}
      className={`flex h-8 w-8 items-center justify-center rounded-full bg-cream/90 backdrop-blur transition-colors hover:bg-cream ${className}`}
    >
      <i className={`${isSaved ? "ri-heart-fill text-plum" : "ri-heart-line text-ink"} text-[15px]`} />
    </button>
  );
};

export default WishlistButton;
