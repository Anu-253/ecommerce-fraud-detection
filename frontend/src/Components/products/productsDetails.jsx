import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from '../../../Redux/slice/productsSlice';
import { addToCart } from '../../../Redux/slice/cartSlice';

import {
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiHeart,
  FiCheck,
  FiArrowLeft,
} from 'react-icons/fi';

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    selectedProduct,
    loading,
    error,
    similarProducts,
  } = useSelector((state) => state.products);

  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const productfetchId = productId || id;

  useEffect(() => {
    if (productfetchId) {
      dispatch(fetchProductDetails(productfetchId));
      dispatch(fetchSimilarProducts({ id: productfetchId }));
    }
  }, [dispatch, productfetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const colorsToDisplay =
    Array.isArray(selectedProduct?.colors) &&
    selectedProduct.colors.length > 0
      ? selectedProduct.colors
      : ['Red', 'Blue', 'Green'];

  const sizesToDisplay =
    Array.isArray(selectedProduct?.sizes) &&
    selectedProduct.sizes.length > 0
      ? selectedProduct.sizes
      : ['S', 'M', 'L'];

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color', {
        duration: 1000,
      });
      return;
    }

    dispatch(
      addToCart({
        productId: productfetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    ).then(() =>
      toast.success('Product added to the cart', {
        duration: 1000,
      })
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-[600px] items-center justify-center bg-[#f7f3ef]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#321326]/20 border-t-[#321326]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[600px] items-center justify-center bg-[#f7f3ef]">
        <p className="text-sm text-red-500">
          Error: {error}
        </p>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="flex min-h-[600px] items-center justify-center bg-[#f7f3ef]">
        <p className="text-sm text-gray-500">
          No product found.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3ef] text-[#24161d]">

      {/* BREADCRUMB */}
      <div className="mx-auto max-w-[1500px] px-5 pt-7 sm:px-8">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 transition hover:text-[#321326]"
        >
          <FiArrowLeft size={15} />
          Back
        </button>
      </div>

      {/* MAIN PRODUCT */}
      <section className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">

          {/* IMAGE AREA */}
          <div className="grid gap-4 md:grid-cols-[88px_1fr]">

            {/* THUMBNAILS */}
            <div className="hidden flex-col gap-3 md:flex">
              {selectedProduct.images?.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setMainImage(image.url)}
                  className={`overflow-hidden rounded-2xl border-2 transition ${
                    mainImage === image.url
                      ? 'border-[#321326]'
                      : 'border-transparent'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.altText || `Product ${index + 1}`}
                    className="h-20 w-20 object-cover"
                  />
                </button>
              ))}
            </div>

            {/* MAIN IMAGE */}
            <div className="relative overflow-hidden rounded-[30px] bg-[#eee8e3]">

              <img
                src={mainImage || '/default-product.png'}
                alt={selectedProduct.name || 'Product'}
                className="h-[520px] w-full object-contain p-6 sm:h-[680px] sm:p-10"
              />

              <div className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#321326] shadow-sm">
                ShopShield
              </div>

              <button
                type="button"
                className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#321326] shadow-sm transition hover:scale-105"
                aria-label="Add to wishlist"
              >
                <FiHeart size={18} />
              </button>
            </div>

            {/* MOBILE THUMBNAILS */}
            <div className="flex gap-3 overflow-x-auto md:hidden">
              {selectedProduct.images?.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setMainImage(image.url)}
                  className={`shrink-0 overflow-hidden rounded-xl border-2 ${
                    mainImage === image.url
                      ? 'border-[#321326]'
                      : 'border-transparent'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.altText || `Product ${index + 1}`}
                    className="h-20 w-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="flex flex-col justify-center py-2 lg:py-8">

            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#7b315f]">
              ShopShield Collection
            </p>

            <h1 className="mt-5 font-serif text-4xl leading-[1.05] text-[#321326] sm:text-5xl lg:text-6xl">
              {selectedProduct.name}
            </h1>

            {/* PRICE */}
            <div className="mt-6 flex items-center gap-4">
              <p className="text-2xl font-semibold text-[#321326]">
                ₹{Number(selectedProduct.price).toLocaleString('en-IN')}
              </p>

              {selectedProduct.originalprice && (
                <p className="text-sm text-gray-400 line-through">
                  ₹
                  {Number(
                    selectedProduct.originalprice
                  ).toLocaleString('en-IN')}
                </p>
              )}
            </div>

            <div className="my-8 h-px bg-[#321326]/10" />

            {/* DESCRIPTION */}
            <p className="text-sm leading-7 text-gray-600">
              {selectedProduct.description}
            </p>

            {/* COLOR */}
            <div className="mt-9">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#321326]">
                  Color
                </p>

                {selectedColor && (
                  <span className="text-xs text-gray-500">
                    {selectedColor}
                  </span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {colorsToDisplay.map((color) => {
                  const bgColor = color.toLowerCase();

                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select ${color}`}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                        selectedColor === color
                          ? 'border-[#321326] p-1'
                          : 'border-gray-200'
                      }`}
                    >
                      <span
                        className="h-full w-full rounded-full"
                        style={{ backgroundColor: bgColor }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SIZE */}
            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#321326]">
                Select Size
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {sizesToDisplay.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[58px] rounded-xl border px-4 py-3 text-sm font-medium transition ${
                      selectedSize === size
                        ? 'border-[#321326] bg-[#321326] text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-[#321326]'
                    }`}
                  >
                    {size.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY */}
            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#321326]">
                Quantity
              </p>

              <div className="mt-4 flex h-12 w-fit items-center rounded-xl border border-gray-200 bg-white">
                <button
                  type="button"
                  onClick={handleDecrease}
                  className="flex h-full w-12 items-center justify-center text-gray-500 transition hover:text-[#321326]"
                  aria-label="Decrease quantity"
                >
                  <FiMinus size={16} />
                </button>

                <span className="w-10 text-center text-sm font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={handleIncrease}
                  className="flex h-full w-12 items-center justify-center text-gray-500 transition hover:text-[#321326]"
                  aria-label="Increase quantity"
                >
                  <FiPlus size={16} />
                </button>
              </div>
            </div>

            {/* ADD TO CART */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
              className={`mt-8 flex w-full items-center justify-center gap-3 rounded-xl py-4 text-sm font-bold uppercase tracking-[0.12em] transition ${
                selectedSize && selectedColor
                  ? 'bg-[#321326] text-white hover:bg-[#54203f]'
                  : 'cursor-not-allowed bg-gray-200 text-gray-400'
              }`}
            >
              <FiShoppingBag size={18} />

              {selectedSize && selectedColor
                ? 'Add to Cart'
                : 'Select Size & Color'}
            </button>

            {/* TRUST */}
            <div className="mt-7 grid grid-cols-2 gap-4 border-t border-[#321326]/10 pt-6">

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <FiCheck className="shrink-0 text-[#7b315f]" />
                Trusted shopping
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <FiCheck className="shrink-0 text-[#7b315f]" />
                Secure checkout
              </div>

            </div>

            {/* DETAILS */}
            <div className="mt-8 border-t border-[#321326]/10 pt-6">

              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#321326]">
                Product Details
              </h3>

              <div className="mt-5 space-y-4 text-sm">

                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500">
                    Brand
                  </span>

                  <span className="font-medium">
                    {selectedProduct.brand || '—'}
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500">
                    Material
                  </span>

                  <span className="font-medium">
                    {selectedProduct.material || '—'}
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SIMILAR PRODUCTS */}
      <section className="border-t border-[#321326]/10 bg-[#fffdfb] px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1500px]">

          <div className="mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#7b315f]">
              More to explore
            </p>

            <h2 className="mt-3 font-serif text-4xl text-[#321326] sm:text-5xl">
              You May Also Like
            </h2>
          </div>

          <ProductGrid
            products={similarProducts}
            loading={loading}
            error={error}
          />

        </div>
      </section>

    </main>
  );
};

export default ProductDetails;
