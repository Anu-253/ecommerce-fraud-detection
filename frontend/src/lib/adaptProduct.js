import { catalogPhoto, IMAGE_FALLBACK, withFallback } from "./image";

/**
 * Common shape consumed by <ProductCard />:
 * {
 *   id, href, name, category, image, price, originalPrice, discount,
 *   rating, numReviews, hasTrustData, realityScore, sellerTrustScore,
 *   fastDelivery, deliveryTime, makeOffer, aiGenerated
 * }
 */

export function fromCatalog(p) {
  return {
    id: p.id,
    href: `/product/catalog-${p.id}`,
    name: p.name,
    category: p.articleType || p.category,
    image: catalogPhoto(p.imagePath) || IMAGE_FALLBACK,
    price: p.price,
    originalPrice: p.originalPrice,
    discount: p.discount,
    rating: p.rating,
    numReviews: p.numReviews,
    hasTrustData: true,
    realityScore: p.realityScore,
    sellerTrustScore: p.sellerTrustScore,
    fastDelivery: p.fastDelivery,
    deliveryTime: p.deliveryTime,
    makeOffer: p.makeOffer,
    aiGenerated: p.aiGeneratedImages > 0,
    stock: p.stock,
    gender: p.gender,
    color: p.color,
    usage: p.usage,
    sellerImages: p.sellerImages,
    verifiedCustomerPhotos: p.verifiedCustomerPhotos,
  };
}

// Live backend product (from Redux `products.products[]`) — schema:
// { _id, name, price, images: [{url, altText}], category, gender, sizes, colors, ... }
export function fromApiProduct(p) {
  if (!p) return null;
  const image = withFallback(p.images?.[0]?.url, p._id);
  return {
    id: p._id,
    href: `/product/${p._id}`,
    name: p.name,
    category: p.category,
    image,
    price: p.price,
    originalPrice: p.originalprice || p.originalPrice || null,
    discount: null,
    rating: p.rating || null,
    numReviews: p.numReviews || null,
    // The live backend does not yet store trust-intelligence fields —
    // never fabricate them for real products.
    hasTrustData: false,
    realityScore: null,
    sellerTrustScore: null,
    fastDelivery: null,
    deliveryTime: null,
    makeOffer: null,
    aiGenerated: false,
  };
}
