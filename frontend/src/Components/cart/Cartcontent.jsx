import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity, setLocalCart } from '../../../Redux/slice/cartSlice';
import { formatPrice } from '../../lib/format';

const Cartcontent = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity, size, color, source) => {
    const newQuantity = quantity + delta;
    if (source === 'catalog') {
      if (newQuantity < 1) {
        handleRemoveFromCart(productId, size, color, source);
        return;
      }
      const products = (cart?.products || []).map((p) =>
        p.productId === productId && p.size === size && p.color === color ? { ...p, quantity: newQuantity } : p
      );
      const totalPrice = products.reduce((sum, p) => sum + Number(p.price || 0) * Number(p.quantity || 1), 0);
      dispatch(setLocalCart({ products, totalPrice }));
      return;
    }
    if (newQuantity >= 1) {
      dispatch(updateCartItemQuantity({ productId, quantity: newQuantity, guestId, userId, size, color }));
    }
  };

  const handleRemoveFromCart = (productId, size, color, source) => {
    if (source === 'catalog') {
      const products = (cart?.products || []).filter((p) => !(p.productId === productId && p.size === size && p.color === color));
      const totalPrice = products.reduce((sum, p) => sum + Number(p.price || 0) * Number(p.quantity || 1), 0);
      dispatch(setLocalCart({ products, totalPrice }));
      return;
    }
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };

  return (
    <div className="divide-y divide-line">
      {cart?.products?.length > 0 ? (
        cart.products.map((product, index) => {
          const imageUrl =
            typeof product.image === 'string' && product.image.trim() !== ''
              ? product.image
              : product?.images?.[0]?.url?.trim()
              ? product.images[0].url
              : null;

          return (
            <div key={index} className="flex items-start justify-between gap-4 py-4">
              <div className="flex items-start gap-4">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="h-24 w-16 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder.jpg';
                    }}
                  />
                ) : (
                  <div className="flex h-24 w-16 items-center justify-center bg-sand-light text-[10px] text-ink-muted text-center">
                    No Image
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-medium text-ink">{product.name}</h3>
                  <p className="text-xs text-ink-muted mt-0.5">
                    Size: {product.size} · Color: {product.color}
                  </p>
                  <div className="mt-3 flex items-center border border-line w-fit">
                    <button
                      onClick={() => handleAddToCart(product.productId, -1, product.quantity, product.size, product.color, product.source)}
                      className="px-2.5 py-1 text-sm hover:text-plum"
                    >
                      −
                    </button>
                    <span className="px-2 text-sm">{product.quantity}</span>
                    <button
                      onClick={() => handleAddToCart(product.productId, 1, product.quantity, product.size, product.color, product.source)}
                      className="px-2.5 py-1 text-sm hover:text-plum"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-ink">{formatPrice(product.price)}</p>
                <button
                  onClick={() => handleRemoveFromCart(product.productId, product.size, product.color, product.source)}
                  aria-label="Remove item"
                  className="mt-3 text-ink-muted hover:text-rust"
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-ink-muted py-8">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cartcontent;
