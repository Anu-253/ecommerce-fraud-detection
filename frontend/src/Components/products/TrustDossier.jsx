import React from "react";
import RealityScore from "../Common/RealityScore";
import SellerTrustBadge from "../Common/SellerTrustBadge";
import PriceHistory from "../Common/PriceHistory";

/**
 * `trust` is optional — when the product came from the live backend
 * (no Reality Score / Seller Trust fields exist there yet), we fall back
 * to the general ShopShield buyer-protection guarantees instead of
 * inventing numbers.
 */
const TrustDossier = ({ trust, productId, price }) => {
  const hasScores = trust && (trust.realityScore != null || trust.sellerTrustScore != null);

  return (
    <div className="border border-line bg-cream-soft p-6">
      <div className="flex items-center gap-2 mb-5">
        <i className="ri-shield-check-fill text-plum text-lg" />
        <h3 className="font-serif text-lg text-ink">ShopShield Trust Dossier</h3>
      </div>

      {hasScores ? (
        <div className="space-y-5">
          <RealityScore score={trust.realityScore} size="lg" />
          <SellerTrustBadge score={trust.sellerTrustScore} size="lg" />

          <div className="grid grid-cols-2 gap-4 pt-2 text-sm">
            <div className="flex items-center gap-2 text-ink-soft">
              <i className="ri-chat-check-line text-plum" />
              {trust.numReviews ?? 0} verified reviews
            </div>
            <div className="flex items-center gap-2 text-ink-soft">
              <i className="ri-camera-line text-plum" />
              {trust.verifiedCustomerPhotos ?? 0} buyer photos
            </div>
            <div className="flex items-center gap-2 text-ink-soft">
              <i className="ri-image-2-line text-plum" />
              {trust.aiGenerated ? "AI-enhanced image disclosed" : "No AI-enhanced images"}
            </div>
            <div className="flex items-center gap-2 text-ink-soft">
              <i className="ri-truck-line text-plum" />
              {trust.deliveryTime || "Standard delivery"}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3 text-sm text-ink-soft">
          <p className="text-ink-muted text-[13px] mb-2">
            Full Reality Score and Seller Trust metrics for this listing are being audited.
            Every ShopShield order is still covered by:
          </p>
          <div className="flex items-center gap-2"><i className="ri-lock-line text-plum" /> Escrow-held payment until delivery is confirmed</div>
          <div className="flex items-center gap-2"><i className="ri-image-2-line text-plum" /> True-to-image guarantee on all listings</div>
          <div className="flex items-center gap-2"><i className="ri-arrow-go-back-line text-plum" /> 30-day return window on mismatched items</div>
        </div>
      )}

      {price ? <PriceHistory productId={productId} price={price} /> : null}
    </div>
  );
};

export default TrustDossier;
