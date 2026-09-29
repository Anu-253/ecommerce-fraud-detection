import React from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "./productsDetails";
import CatalogProductDetails from "./CatalogProductDetails";

const ProductRoute = () => {
  const { id } = useParams();
  return String(id).startsWith("catalog-") ? <CatalogProductDetails /> : <ProductDetails />;
};

export default ProductRoute;
