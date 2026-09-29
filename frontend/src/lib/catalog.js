// ShopShield local product-data adapter
//
// ShopShield's supplied 120-product catalog is the source of truth for the
// polished demo storefront. The live backend still owns authenticated/cart/
// order flows where available, while the catalog provides the transparent
// merchandising fields (Reality Score, Seller Trust, delivery, offer support,
// verified-photo counts, etc.) used by the browsing experience.

const CSV_URL = "/data/shopshield_catalog.csv";

let cache = null;
let inflight = null;

function parseCSVLine(line) {
  // Safe for this dataset: no quoted/escaped commas in any field.
  return line.split(",");
}

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = parseCSVLine(lines[0]);
  return lines.slice(1).map((line) => {
    const cells = parseCSVLine(line);
    const row = {};
    headers.forEach((h, i) => {
      row[h.trim()] = (cells[i] ?? "").trim();
    });
    return row;
  });
}

const toBool = (v) => String(v).toLowerCase() === "true";
const toNum = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

/**
 * Normalizes one raw CSV row into the consistent ShopShield product model
 * described in the project brief.
 */
export function mapCatalogRow(row) {
  const price = toNum(row.price);
  const discount = toNum(row.discount);
  const originalPrice = discount > 0 ? Math.round(price / (1 - discount / 100)) : null;

  return {
    id: row.id,
    source: "catalog",
    name: row.productDisplayName,
    category: row.subCategory,
    masterCategory: row.masterCategory,
    articleType: row.articleType,
    gender: row.gender,
    color: row.baseColour,
    usage: row.usage,
    season: row.season,
    imagePath: row.imagePath,
    price,
    originalPrice,
    discount,
    stock: toNum(row.stock),
    rating: toNum(row.rating),
    numReviews: toNum(row.numReviews),
    realityScore: toNum(row.realityScore),
    sellerTrustScore: toNum(row.sellerTrustScore),
    fastDelivery: toBool(row.fastDelivery),
    deliveryTime: row.deliveryTime,
    makeOffer: toBool(row.makeOffer),
    sellerImages: toNum(row.sellerImages),
    aiGeneratedImages: toNum(row.aiGeneratedImages),
    verifiedCustomerPhotos: toNum(row.verifiedCustomerPhotos),
  };
}

export async function loadCatalog() {
  if (cache) return cache;
  if (inflight) return inflight;

  inflight = fetch(CSV_URL)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load catalog (${res.status})`);
      return res.text();
    })
    .then((text) => {
      cache = parseCSV(text).map(mapCatalogRow).filter((p) => p.id && p.name);
      return cache;
    })
    .catch((err) => {
      console.error("ShopShield catalog load failed:", err);
      cache = [];
      return cache;
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

// ---- Selectors -------------------------------------------------------

export function pickAvailableNow(products, limit = 8) {
  return [...products]
    .sort((a, b) => b.numReviews - a.numReviews)
    .slice(0, limit);
}

export function pickPriceDrops(products, limit = 8) {
  return products
    .filter((p) => p.discount > 0)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, limit);
}

export function pickTrustedPicks(products, limit = 8) {
  return products
    .filter((p) => p.realityScore >= 85 && p.sellerTrustScore >= 80)
    .sort((a, b) => (b.realityScore + b.sellerTrustScore) - (a.realityScore + a.sellerTrustScore))
    .slice(0, limit);
}

export function pickByCategory(products, subCategory, limit = 12) {
  return products.filter((p) => p.category === subCategory).slice(0, limit);
}

export function pickByMaster(products, masterCategory, limit = 12) {
  return products.filter((p) => p.masterCategory === masterCategory).slice(0, limit);
}

export const CATEGORY_SUMMARY = [
  { label: "Women", filter: (p) => p.gender === "Women" },
  { label: "Men", filter: (p) => p.gender === "Men" },
  { label: "Top Wear", filter: (p) => p.category === "Topwear" },
  { label: "Bottom Wear", filter: (p) => p.category === "Bottomwear" },
  { label: "Accessories", filter: (p) => p.masterCategory === "Accessories" },
];
