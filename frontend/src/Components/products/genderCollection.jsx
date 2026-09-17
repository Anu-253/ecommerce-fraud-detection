import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const GenderCollection = () => {
  const collections = [
    {
      title: 'Women',
      subtitle: 'Discover the latest styles',
      image:
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=90',
      link: '/collection/all?gender=Women',
    },
    {
      title: 'Men',
      subtitle: 'Elevated everyday essentials',
      image:
        'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=90',
      link: '/collection/all?gender=Men',
    },
  ];

  return (
    <section className="bg-[#f7f3ef] px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-[1500px]">

        {/* SECTION TITLE */}
        <div className="mb-10 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#7b315f]">
            Explore the collections
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#321326] sm:text-5xl lg:text-6xl">
            Something for everyone
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-gray-500">
            Discover carefully selected pieces designed to make everyday
            dressing feel effortless.
          </p>
        </div>

        {/* COLLECTION CARDS */}
        <div className="grid gap-5 md:grid-cols-2">
          {collections.map((collection) => (
            <Link
              key={collection.title}
              to={collection.link}
              className="group relative h-[520px] overflow-hidden"
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1d1118]/80 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-10">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
                  Collection
                </p>

                <div className="flex items-end justify-between gap-5">
                  <div>
                    <h3 className="font-serif text-5xl text-white sm:text-6xl">
                      {collection.title}
                    </h3>

                    <p className="mt-3 text-sm text-white/70">
                      {collection.subtitle}
                    </p>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#321326] transition duration-300 group-hover:translate-x-1">
                    <FiArrowRight size={19} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GenderCollection;
