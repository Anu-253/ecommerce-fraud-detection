import React from "react";
import ProductCard from "./ProductCard";
import EmptyState from "../Common/EmptyState";
import { fromApiProduct } from "../../lib/adaptProduct";

const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="aspect-[3/4] bg-sand-light" />
    <div className="mt-3 space-y-2">
      <div className="h-2.5 w-1/3 bg-sand-light" />
      <div className="h-3 w-4/5 bg-sand-light" />
      <div className="h-3 w-1/2 bg-sand-light" />
    </div>
  </div>
);

const ProductGrid = ({ products, loading, error, columns = "sm:grid-cols-2 lg:grid-cols-4" }) => {
  if (loading) {
    return (
      <div className={`grid grid-cols-1 ${columns} gap-x-6 gap-y-10`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon="ri-error-warning-line"
        tone="error"
        title="We couldn't load these products"
        body={typeof error === "string" ? error : "Please try again in a moment."}
      />
    );
  }

  const valid = Array.isArray(products)
    ? products.filter((p) => p && p._id && p.name && p.price != null)
    : [];

  if (valid.length === 0) {
    return (
      <EmptyState
        icon="ri-shopping-bag-3-line"
        title="No products found"
        body="Try adjusting your filters or search — ShopShield's verified catalog is always growing."
      />
    );
  }

  return (
    <div className={`grid grid-cols-1 ${columns} gap-x-6 gap-y-10`}>
      {valid.map((product) => (
        <ProductCard key={product._id} product={fromApiProduct(product)} />
      ))}
    </div>
  );
};

export default ProductGrid;
