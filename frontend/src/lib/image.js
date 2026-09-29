// ShopShield image helpers.
//
// The supplied 120-product catalog contains image filenames, but the ZIP does
// not contain those binary product photos. We therefore keep the image URL
// deterministic and small enough to behave like a normal card thumbnail.
// When real product media is added later, catalogImage() can be swapped for
// the CDN/storage path without touching the UI.

const PLACEHOLDER_BASE = "https://picsum.photos/seed";

export function catalogImage(id, w = 640, h = 800) {
  return `${PLACEHOLDER_BASE}/shopshield-${id}/${w}/${h}`;
}

export function withFallback(url, id, w = 640, h = 800) {
  return url && url.trim() ? url : catalogImage(id, w, h);
}

// Real product photo for a catalog row. The CSV's imagePath (e.g. "29165.jpg")
// is the only reliable link between a product title and its photo, so the URL is
// built from it. Place the photos in /public/products/.
export const PRODUCT_IMAGE_DIR = "/products";

export function catalogPhoto(imagePath) {
  return imagePath ? `${PRODUCT_IMAGE_DIR}/${imagePath}` : null;
}

// Neutral placeholder (no photo) shown only if a product photo file is missing.
export const IMAGE_FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='640' height='752' viewBox='0 0 640 752'><rect width='640' height='752' fill='#EDE6D8'/></svg>"
  );

export function onImageError(e) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = IMAGE_FALLBACK;
}
