import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';
import TrustDossier from './TrustDossier';
import OfferButton from '../Common/OfferButton';
import WishlistButton from '../Common/WishlistButton';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchSimilarProducts } from '../../../Redux/slice/productsSlice';
import { addToCart } from '../../../Redux/slice/cartSlice';
import { formatPrice } from '../../lib/format';
import { withFallback } from '../../lib/image';

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.products);
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
    Array.isArray(selectedProduct?.colors) && selectedProduct.colors.length > 0
      ? selectedProduct.colors
      : ['Red', 'Blue', 'Green'];

  const sizesToDisplay =
    Array.isArray(selectedProduct?.sizes) && selectedProduct.sizes.length > 0
      ? selectedProduct.sizes
      : ['S', 'M', 'L'];

  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);
  const handleIncrease = () => setQuantity(quantity + 1);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color', { duration: 1500 });
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
    ).then(() => toast.success('Product added to your cart', { duration: 1500 }));
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color', { duration: 1500 });
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
    ).then(() => navigate(user ? '/checkout' : '/login?redirect=checkout'));
  };

  if (loading)
    return <p className="text-center py-24 text-ink-muted">Loading product details...</p>;
  if (error) return <p className="text-center py-24 text-rust">Error: {error}</p>;
  if (!selectedProduct) return <p className="text-center py-24 text-ink-muted">No product found.</p>;

  return (
    <div className="container-shop py-10 md:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Gallery */}
        <div className="lg:col-span-7">
          <div className="flex gap-4">
            <div className="hidden md:flex flex-col gap-3">
              {selectedProduct.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(image.url)}
                  className={`h-20 w-16 overflow-hidden border ${
                    mainImage === image.url ? 'border-ink' : 'border-line'
                  }`}
                >
                  <img src={image.url} alt={image.altText || `Thumbnail ${index}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            <div className="flex-1">
              <div className="aspect-[4/5] bg-sand-light overflow-hidden">
                <img
                  src={withFallback(mainImage, selectedProduct._id)}
                  alt={selectedProduct.name || 'Product'}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="md:hidden flex gap-3 mt-3 overflow-x-auto scrollbar-hide">
                {selectedProduct.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(image.url)}
                    className={`h-16 w-16 shrink-0 overflow-hidden border ${
                      mainImage === image.url ? 'border-ink' : 'border-line'
                    }`}
                  >
                    <img src={image.url} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              {selectedProduct.category && (
                <p className="text-[10.5px] uppercase tracking-widest2 text-ink-muted mb-2">{selectedProduct.category}</p>
              )}
              <h1 className="font-serif text-3xl md:text-4xl text-ink mb-3">{selectedProduct.name}</h1>
            </div>
            <WishlistButton
              item={{
                id: selectedProduct._id,
                name: selectedProduct.name,
                price: selectedProduct.price,
                image: withFallback(selectedProduct.images?.[0]?.url, selectedProduct._id),
                href: `/product/${selectedProduct._id}`,
              }}
              className="!static shrink-0 border border-line"
            />
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-xl text-ink font-semibold">{formatPrice(selectedProduct.price)}</span>
            {selectedProduct.originalprice && (
              <span className="text-ink-muted line-through">{formatPrice(selectedProduct.originalprice)}</span>
            )}
          </div>

          {selectedProduct.description && (
            <p className="text-ink-soft leading-relaxed mb-6">{selectedProduct.description}</p>
          )}

          {/* Color */}
          <div className="mb-6">
            <p className="text-[11px] uppercase tracking-widest2 text-ink-muted mb-2">
              Color {selectedColor && <span className="text-ink normal-case tracking-normal">— {selectedColor}</span>}
            </p>
            <div className="flex gap-2">
              {colorsToDisplay.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color.toLowerCase() }}
                  className={`h-8 w-8 rounded-full border transition-transform hover:scale-105 ${
                    selectedColor === color ? 'ring-2 ring-plum ring-offset-2 ring-offset-cream' : 'border-line'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-6">
            <p className="text-[11px] uppercase tracking-widest2 text-ink-muted mb-2">Size</p>
            <div className="flex flex-wrap gap-2">
              {sizesToDisplay.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border text-sm transition-colors ${
                    selectedSize === size ? 'bg-ink text-cream border-ink' : 'border-line text-ink-soft hover:border-ink'
                  }`}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <p className="text-[11px] uppercase tracking-widest2 text-ink-muted mb-2">Quantity</p>
            <div className="flex items-center gap-4 border border-line w-fit">
              <button onClick={handleDecrease} className="px-4 py-2 text-lg hover:text-plum">−</button>
              <span className="text-sm">{quantity}</span>
              <button onClick={handleIncrease} className="px-4 py-2 text-lg hover:text-plum">+</button>
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-8">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor}
                className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedSize && selectedColor ? 'Add to Cart' : 'Select Options'}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!selectedSize || !selectedColor}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>
            <OfferButton product={selectedProduct} full />
          </div>

          <TrustDossier trust={null} productId={selectedProduct._id} price={selectedProduct.price} />

          {(selectedProduct.brand || selectedProduct.material) && (
            <div className="mt-8">
              <h3 className="text-[11px] uppercase tracking-widest2 text-ink-muted mb-3">Characteristics</h3>
              <table className="w-full text-sm text-ink-soft">
                <tbody>
                  {selectedProduct.brand && (
                    <tr className="border-t border-line">
                      <td className="py-2 text-ink-muted">Brand</td>
                      <td className="py-2 text-ink">{selectedProduct.brand}</td>
                    </tr>
                  )}
                  {selectedProduct.material && (
                    <tr className="border-t border-line">
                      <td className="py-2 text-ink-muted">Material</td>
                      <td className="py-2 text-ink">{selectedProduct.material}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Similar products */}
      <div className="mt-20">
        <p className="section-eyebrow">You May Also Like</p>
        <h2 className="section-title mb-8">Similar Verified Pieces</h2>
        <ProductGrid products={similarProducts} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default ProductDetails;
