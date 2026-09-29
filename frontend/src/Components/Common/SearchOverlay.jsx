import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductsByFilters, setFilters } from "../../../Redux/slice/productsSlice";

const SearchOverlay = ({ open, onClose }) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    dispatch(setFilters({ search }));
    dispatch(fetchProductsByFilters({ search }));
    navigate(`/collection/all?search=${encodeURIComponent(search)}`);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-cream animate-fade-in">
      <div className="container-shop py-6">
        <div className="flex justify-end">
          <button onClick={onClose} aria-label="Close search" className="p-2 text-ink hover:text-plum">
            <i className="ri-close-line text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mt-10 md:mt-20">
          <p className="section-eyebrow text-center justify-center">Search ShopShield</p>
          <div className="flex items-center border-b-2 border-ink pb-3">
            <i className="ri-search-line text-2xl text-ink-muted mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, categories, colors..."
              className="w-full bg-transparent font-serif text-2xl md:text-3xl text-ink placeholder:text-ink-muted/50 focus:outline-none"
            />
          </div>
          <p className="text-center text-xs text-ink-muted mt-4">
            Press Enter to search the verified ShopShield catalog
          </p>
        </form>
      </div>
    </div>
  );
};

export default SearchOverlay;
