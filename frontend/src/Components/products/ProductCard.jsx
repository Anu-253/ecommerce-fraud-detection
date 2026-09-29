import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../lib/format";
import { onImageError } from "../../lib/image";
import PriceDropBadge from "../Common/PriceDropBadge";
import DeliveryBadge from "../Common/DeliveryBadge";
import TrustBadge from "../Common/TrustBadge";
import OfferButton from "../Common/OfferButton";
import WishlistButton from "../Common/WishlistButton";

const ProductCard = ({ product, showOffer = true }) => {
  if (!product) return null;

  const {
    id,
    href,
    name,
    category,
    image,
    price,
    originalPrice,
    discount,
    rating,
    numReviews,
    hasTrustData,
    realityScore,
    sellerTrustScore,
    fastDelivery,
    deliveryTime,
    makeOffer,
    aiGenerated,
  } = product;

  const stockLabel = product.stock != null
    ? product.stock <= 5
      ? `Only ${product.stock} left`
      : "In stock"
    : null;

  return (
    <article className="product-card group relative flex min-w-0 flex-col rounded-2xl border border-line/80 bg-cream-soft p-2.5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-sand-dark hover:shadow-soft">
      <Link to={href} className="block">
        <div className="product-card-media relative aspect-[4/4.7] overflow-hidden rounded-xl bg-sand-light">
          <img
            src={image}
            alt={name}
            loading="lazy"
            onError={onImageError}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
          />

          <div className="absolute inset-x-2.5 top-2.5 flex items-start justify-between gap-2">
            <div className="flex max-w-[75%] flex-wrap gap-1.5">
              {discount > 0 && <PriceDropBadge discount={discount} />}
              {hasTrustData && realityScore >= 85 && (
                <TrustBadge icon="ri-shield-check-fill" tone="sage">Verified</TrustBadge>
              )}
              {hasTrustData && aiGenerated && (
                <TrustBadge icon="ri-image-2-line" tone="ink">AI-enhanced</TrustBadge>
              )}
            </div>
            <WishlistButton
              item={{ id, name, price, image, href }}
              className="!static shrink-0 !bg-cream/90 !backdrop-blur"
            />
          </div>

          <div className="absolute bottom-2.5 left-2.5 rounded-full border border-white/40 bg-ink/75 px-2.5 py-1 text-[9px] font-medium uppercase tracking-widest2 text-cream backdrop-blur">
            {category}
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-1.5 pb-1 pt-3">
        <Link to={href}>
          <h3 className="line-clamp-2 text-[14px] font-semibold leading-snug text-ink transition-colors hover:text-plum">
            {name}
          </h3>
        </Link>

        <div className="mt-2 flex items-end justify-between gap-2">
          <div className="flex min-w-0 items-baseline gap-2">
            <span className="text-[15px] font-bold text-ink">{formatPrice(price)}</span>
            {originalPrice && originalPrice > price && (
              <span className="text-[11px] text-ink-muted line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
          {discount > 0 && (
            <span className="shrink-0 text-[10px] font-bold text-sage">{discount}% off</span>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          {rating ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-sand-light px-2 py-1 text-[10.5px] font-medium text-ink-soft">
              <i className="ri-star-fill text-[10px] text-rust" />
              {rating}
              {numReviews ? <span className="text-ink-muted">· {numReviews}</span> : null}
            </span>
          ) : <span />}

          {stockLabel && (
            <span className={`text-[10px] font-medium ${product.stock <= 5 ? "text-rust" : "text-sage"}`}>
              {stockLabel}
            </span>
          )}
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
          {hasTrustData && (
            <>
              <span className="text-[9.5px] text-ink-soft">
                <span className="font-semibold text-plum">{realityScore}</span> reality
              </span>
              <span className="text-[9.5px] text-ink-soft">
                <span className="font-semibold text-plum">{sellerTrustScore}</span> trust
              </span>
            </>
          )}
          <DeliveryBadge fastDelivery={fastDelivery} deliveryTime={deliveryTime} />
        </div>

        {showOffer && makeOffer && (
          <div className="mt-auto pt-3">
            <OfferButton product={{ id, name, price }} className="!w-full !rounded-xl !py-2 !px-3 !text-[10px]" />
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
