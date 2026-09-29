import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// NOTE ON FIELD NAMES: the live filter thunk (Redux/slice/productsSlice.js)
// reads `minprice` / `maxprice` (lowercase) from the query string. Category
// values are kept in sync with the values the navbar links already send
// ("Top Wear" / "Bottom Wear" / "Accessories"), so clicking a nav link and
// using the sidebar always agree on the same filter value.

const CATEGORIES = ['Top Wear', 'Bottom Wear', 'Dresses', 'Outerwear', 'Accessories'];
const COLORS = ['Black', 'Blue', 'Red', 'Green', 'Grey', 'White', 'Beige', 'Maroon', 'Orange', 'Pink', 'Navy'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const GENDERS = ['Men', 'Women'];
const MAX_PRICE = 10000;

const AccordionSection = ({ title, defaultOpen = true, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line py-5 first:pt-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-[11.5px] uppercase tracking-widest2 text-ink">{title}</span>
        <i className={`ri-${open ? 'subtract' : 'add'}-line text-ink-muted text-base`} />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
};

const FiltersideBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({
    category: '',
    gender: '',
    color: '',
    size: [],
    minprice: 0,
    maxprice: MAX_PRICE,
  });

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilter({
      category: params.category || '',
      gender: params.gender || '',
      color: params.color || '',
      size: params.size ? params.size.split(',') : [],
      minprice: Number(params.minprice) || 0,
      maxprice: Number(params.maxprice) || MAX_PRICE,
    });
  }, [searchParams]);

  const updateParam = (key, value) => {
    const next = { ...Object.fromEntries([...searchParams]) };
    if (value === '' || value == null || (Array.isArray(value) && value.length === 0)) {
      delete next[key];
    } else {
      next[key] = Array.isArray(value) ? value.join(',') : value;
    }
    setSearchParams(next);
  };

  const toggleGender = (g) => updateParam('gender', filter.gender === g ? '' : g);
  const toggleCategory = (c) => updateParam('category', filter.category === c ? '' : c);
  const toggleColor = (c) => updateParam('color', filter.color === c ? '' : c);
  const toggleSize = (s) => {
    const next = filter.size.includes(s) ? filter.size.filter((x) => x !== s) : [...filter.size, s];
    updateParam('size', next);
  };

  const clearAll = () => setSearchParams({});

  const activeCount =
    (filter.category ? 1 : 0) +
    (filter.gender ? 1 : 0) +
    (filter.color ? 1 : 0) +
    filter.size.length +
    (filter.maxprice < MAX_PRICE ? 1 : 0);

  return (
    <aside className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-serif text-lg text-ink flex items-center gap-2">
          Filters {activeCount > 0 && <span className="text-[11px] font-sans text-plum">({activeCount})</span>}
        </h2>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-[11px] uppercase tracking-widest2 text-plum hover:underline">
            Clear All
          </button>
        )}
      </div>

      <AccordionSection title="Gender">
        <div className="flex flex-wrap gap-2">
          {GENDERS.map((g) => (
            <button
              key={g}
              onClick={() => toggleGender(g)}
              className={`px-3.5 py-1.5 text-[12px] border transition-colors ${
                filter.gender === g ? 'border-ink bg-ink text-cream' : 'border-line text-ink-soft hover:border-ink'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Category">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => toggleCategory(c)}
              className={`px-3.5 py-1.5 text-[12px] border transition-colors ${
                filter.category === c ? 'border-ink bg-ink text-cream' : 'border-line text-ink-soft hover:border-ink'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Price">
        <input
          type="range"
          min={0}
          max={MAX_PRICE}
          step={100}
          value={filter.maxprice}
          onChange={(e) => updateParam('maxprice', e.target.value)}
          className="w-full accent-plum"
        />
        <div className="flex justify-between text-[12px] text-ink-muted mt-1">
          <span>₹0</span>
          <span>₹{filter.maxprice.toLocaleString('en-IN')}</span>
        </div>
      </AccordionSection>

      <AccordionSection title="Color">
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => toggleColor(c)}
              title={c}
              style={{ backgroundColor: c.toLowerCase() }}
              className={`h-7 w-7 rounded-full border transition-transform hover:scale-110 ${
                filter.color === c ? 'ring-2 ring-plum ring-offset-2 ring-offset-cream' : 'border-line'
              }`}
            />
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Size" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => toggleSize(s)}
              className={`h-8 w-8 flex items-center justify-center text-[12px] border transition-colors ${
                filter.size.includes(s) ? 'border-ink bg-ink text-cream' : 'border-line text-ink-soft hover:border-ink'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </AccordionSection>

      <div className="pt-5 text-[11px] text-ink-muted leading-relaxed">
        Trust Score, Delivery and Discount filters are on the way — they'll switch on the moment
        those fields are live on every listing.
      </div>
    </aside>
  );
};

export default FiltersideBar;
