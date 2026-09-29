import React from "react";
import ProductCard from "./ProductCard";
import EmptyState from "../Common/EmptyState";
import { fromCatalog } from "../../lib/adaptProduct";

const CatalogGrid = ({ products, columns = "sm:grid-cols-2 lg:grid-cols-4", emptyLabel }) => {
  if (!products || products.length === 0) {
    return <EmptyState title={emptyLabel || "Nothing to show yet"} />;
  }

  return (
    <div className={`grid grid-cols-2 ${columns} gap-3 md:gap-4`}>
      {products.map((p) => (
        <ProductCard key={p.id} product={fromCatalog(p)} />
      ))}
    </div>
  );
};

export default CatalogGrid;
