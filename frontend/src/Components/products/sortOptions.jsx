import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    if (sortBy) {
      searchParams.set('sortBy', sortBy);
    } else {
      searchParams.delete('sortBy');
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-[11px] uppercase tracking-widest2 text-ink-muted hidden sm:inline">
        Sort
      </label>
      <select
        id="sort"
        onChange={handleSortChange}
        value={searchParams.get('sortBy') || ''}
        className="border border-line bg-cream-soft px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-ink"
      >
        <option value="">Featured</option>
        <option value="PriceAsc">Price: Low to High</option>
        <option value="PriceDesc">Price: High to Low</option>
        <option value="popularity">Rating</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
};

export default SortOptions;
