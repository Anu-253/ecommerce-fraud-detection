import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addCatalogToCart } from "../../../Redux/slice/cartSlice";
import { formatPrice } from "../../lib/format";
import { loadCatalog } from "../../lib/catalog";
import { fromCatalog } from "../../lib/adaptProduct";
import { onImageError } from "../../lib/image";
import WishlistButton from "../Common/WishlistButton";
import OfferButton from "../Common/OfferButton";
import RealityScore from "../Common/RealityScore";
import FraudShield from "../Common/FraudShield";
import CatalogGrid from "./CatalogGrid";

const CatalogProductDetails = () => {
  const { id } = useParams();
  const catalogId = String(id).replace(/^catalog-/, "");
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");

  const { user, guestId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const product = useMemo(() => catalog.find((item) => String(item.id) === catalogId), [catalog, catalogId]);

  useEffect(() => {
    loadCatalog().then((items) => {
      setCatalog(items);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (product) setSelectedColor(product.color);
  }, [product]);

  const similar = useMemo(() => {
    if (!product) return [];
    return catalog
      .filter((item) => item.id !== product.id && (item.category === product.category || item.masterCategory === product.masterCategory))
      .slice(0, 4);
  }, [catalog, product]);

  const handleAdd = async () => {
    if (!product) return;
    dispatch(addCatalogToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: normalized.image,
      quantity,
      size: "Standard",
      color: selectedColor || product.color,
      guestId,
      userId: user?._id,
    }));
    toast.success("Added to your ShopShield cart");
  };

  if (loading) {
    return <div className="container-shop py-24 text-center text-ink-muted">Loading verified product…</div>;
  }

  if (!product) {
    return (
      <div className="container-shop py-24 text-center">
        <p className="section-eyebrow justify-center">Catalog</p>
        <h1 className="section-title">Product not found</h1>
        <Link to="/collection/all" className="btn-primary mt-6 rounded-xl">Back to catalog</Link>
      </div>
    );
  }

  const normalized = fromCatalog(product);

  return (
    <div className="container-shop py-8 md:py-12">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-widest2 text-ink-muted">
        <Link to="/collection/all" className="hover:text-plum">Catalog</Link>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span className="text-ink">{product.articleType}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
        <div>
          <div className="rounded-[28px] border border-line bg-cream-soft p-3 shadow-card">
            <div className="relative overflow-hidden rounded-[22px] bg-sand-light">
              <img src={normalized.image} alt={product.name} onError={onImageError} className="aspect-[4/4.5] w-full object-cover" />
              <div className="absolute left-4 top-4 flex gap-2">
                {product.discount > 0 && (
                  <span className="rounded-full bg-plum px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest2 text-cream">
                    {product.discount}% off
                  </span>
                )}
                {product.aiGeneratedImages > 0 && (
                  <span className="rounded-full bg-ink/80 px-3 py-1.5 text-[9px] uppercase tracking-widest2 text-cream backdrop-blur">
                    AI image signal
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-line bg-cream-soft p-4">
              <p className="text-[9px] uppercase tracking-widest2 text-ink-muted">Reality</p>
              <p className="mt-1 font-serif text-2xl text-plum">{product.realityScore}</p>
            </div>
            <div className="rounded-2xl border border-line bg-cream-soft p-4">
              <p className="text-[9px] uppercase tracking-widest2 text-ink-muted">Seller trust</p>
              <p className="mt-1 font-serif text-2xl text-plum">{product.sellerTrustScore}</p>
            </div>
            <div className="rounded-2xl border border-line bg-cream-soft p-4">
              <p className="text-[9px] uppercase tracking-widest2 text-ink-muted">Reviews</p>
              <p className="mt-1 font-serif text-2xl text-plum">{product.numReviews}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest2 text-plum">{product.articleType} · {product.gender}</p>
              <h1 className="mt-2 font-serif text-3xl leading-tight text-ink md:text-4xl">{product.name}</h1>
            </div>
            <WishlistButton
              item={{ id: product.id, name: product.name, price: product.price, image: normalized.image, href: `/product/catalog-${product.id}` }}
              className="!static shrink-0 border border-line"
            />
          </div>

          <div className="mt-5 flex flex-wrap items-end gap-3">
            <span className="text-2xl font-bold text-ink">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && <span className="text-sm text-ink-muted line-through">{formatPrice(product.originalPrice)}</span>}
            <span className="text-xs font-semibold text-sage">{product.discount}% saved</span>
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm text-ink-soft">
            <span className="rounded-full bg-sand-light px-2.5 py-1"><i className="ri-star-fill text-rust" /> {product.rating}</span>
            <span>{product.numReviews} reviews</span>
            <span className="text-ink-muted">·</span>
            <span className={product.stock <= 5 ? "text-rust" : "text-sage"}>{product.stock} in stock</span>
          </div>

          <p className="mt-6 leading-7 text-ink-soft">
            {product.name} is listed in {product.category} for {product.usage.toLowerCase()} use. ShopShield surfaces the supplied catalog's pricing, rating, seller-trust and reality signals alongside the product so the purchase context stays visible.
          </p>

          <div className="mt-6 rounded-2xl border border-line bg-cream-soft p-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-widest2 text-ink-muted">Color</p>
              <span className="text-sm text-ink">{product.color}</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => setSelectedColor(product.color)}
                className={`h-9 w-9 rounded-full border-2 bg-sand-dark ${selectedColor === product.color ? "ring-2 ring-plum ring-offset-2" : "border-white"}`}
                title={product.color}
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-[auto_1fr] gap-3">
            <div className="flex items-center rounded-xl border border-line bg-cream-soft">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-3 hover:text-plum">−</button>
              <span className="min-w-8 text-center text-sm">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-3 hover:text-plum">+</button>
            </div>
            <button onClick={handleAdd} className="btn-primary rounded-xl">Add to Cart <i className="ri-shopping-bag-3-line" /></button>
          </div>

          {product.makeOffer && <div className="mt-3"><OfferButton product={{ id: product.id, name: product.name, price: product.price }} full /></div>}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <RealityScore score={product.realityScore} size="lg" />
            <div className="rounded-2xl border border-line bg-cream-soft p-3">
              <p className="text-[9px] uppercase tracking-widest2 text-ink-muted">Delivery</p>
              <p className="mt-1 text-sm font-semibold text-ink">{product.fastDelivery ? product.deliveryTime : "Standard delivery"}</p>
              <p className="mt-1 text-[11px] text-ink-muted">Verified customer photos: {product.verifiedCustomerPhotos}</p>
            </div>
          </div>

          <div className="mt-5">
            <FraudShield isLoggedIn={!!user} addressComplete={!!user} orderValue={product.price * quantity} />
          </div>
        </div>
      </div>

      <section className="mt-14 border-t border-line pt-10">
        <p className="section-eyebrow">You may also like</p>
        <h2 className="section-title mb-7">More from {product.category}</h2>
        <CatalogGrid products={similar} columns="md:grid-cols-4" />
      </section>
    </div>
  );
};

export default CatalogProductDetails;
