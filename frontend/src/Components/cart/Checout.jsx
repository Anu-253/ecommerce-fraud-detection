import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaypalButton from './PaypalButton';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckout } from '../../../Redux/slice/checkoutSlice';
import axios from 'axios';
import { formatPrice } from '../../lib/format';
import FraudShield from '../Common/FraudShield';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate('/');
    }
  }, [cart, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const formattedItems = cart.products.map((product) => ({
        productId: product._id || product.productId,
        name: product.name,
        image: product.images && product.images.length > 0 ? product.images[0].url : 'default-image.jpg',
        price: Number(product.price),
        quantity: product.quantity || 1,
        size: product.size,
        color: product.color,
      }));

      const res = await dispatch(
        createCheckout({
          checkoutItems: formattedItems,
          shippingAddress,
          paymentMethod: 'PayPal',
          totalPrice: Number(cart.totalPrice) || 0,
        })
      );

      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: 'paid', paymentDetails: details },
        { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } }
      );
      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinalizeCheckout = async (id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${id}/finalize`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } }
      );
      navigate('/order-conformation');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p className="text-center py-24 text-ink-muted">Loading cart…</p>;
  if (error) return <p className="text-center py-24 text-rust">Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p className="text-center py-24 text-ink-muted">Your cart is empty.</p>;
  }

  return (
    <div className="container-shop py-10 md:py-14">
      <p className="section-eyebrow">Secure Checkout</p>
      <h1 className="section-title mb-8">Complete Your Order</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="card-line p-6 md:p-8">
          <form onSubmit={handleCheckout}>
            <h3 className="text-[11px] uppercase tracking-widest2 text-ink-muted mb-3">Contact Details</h3>
            <div className="mb-5">
              <input type="email" value={user ? user.email : ''} className="input-line bg-sand-light" disabled />
            </div>

            <h3 className="text-[11px] uppercase tracking-widest2 text-ink-muted mb-3">Delivery</h3>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <input type="text" name="firstName" placeholder="First Name" value={shippingAddress.firstName} onChange={handleChange} className="input-line" required />
              <input type="text" name="lastName" placeholder="Last Name" value={shippingAddress.lastName} onChange={handleChange} className="input-line" required />
            </div>
            <div className="mb-4">
              <input type="text" name="address" placeholder="Address" value={shippingAddress.address} onChange={handleChange} className="input-line" required />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <input type="text" name="city" placeholder="City" value={shippingAddress.city} onChange={handleChange} className="input-line" required />
              <input type="text" name="postalCode" placeholder="Postal Code" value={shippingAddress.postalCode} onChange={handleChange} className="input-line" required />
            </div>
            <div className="mb-6 grid grid-cols-2 gap-4">
              <input type="text" name="country" placeholder="Country" value={shippingAddress.country} onChange={handleChange} className="input-line" required />
              <input type="tel" name="phone" placeholder="Phone" value={shippingAddress.phone} onChange={handleChange} className="input-line" required />
            </div>

            <div className="flex items-center gap-2 mb-6 text-xs text-ink-soft">
              <i className="ri-lock-line text-plum" /> Your payment is held in escrow until delivery is confirmed.
            </div>

            {!checkoutId ? (
              <button type="submit" className="btn-primary w-full">Continue to Payment</button>
            ) : (
              <PaypalButton
                amount={Number(cart.totalPrice) || 0}
                currency="USD"
                onSuccess={handlePaymentSuccess}
                onError={() => alert('Payment failed. Try again')}
              />
            )}
          </form>
        </div>

        {/* Summary */}
        <div className="card-line p-6 md:p-8 h-fit">
          <h3 className="font-serif text-xl text-ink mb-6">Order Summary</h3>
          {cart.products.map((product, index) => (
            <div key={index} className="flex items-center gap-4 mb-4 pb-4 border-b border-line last:border-0">
              {product.image ? (
                <img
                  src={product.image.startsWith('http') ? product.image : `${backendUrl}${product.image}`}
                  alt={product.name}
                  className="h-16 w-16 object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.jpg'; }}
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center bg-sand-light text-[10px] text-ink-muted">No image</div>
              )}
              <div className="flex-1">
                <h4 className="text-sm font-medium text-ink">{product.name}</h4>
                <p className="text-xs text-ink-muted mt-0.5">Size: {product.size} · Color: {product.color}</p>
              </div>
              <p className="text-sm text-ink">{formatPrice(product.price)}</p>
            </div>
          ))}

          <div className="space-y-2 pt-2 text-sm">
            <div className="flex justify-between text-ink-soft">
              <span>Subtotal</span>
              <span>{formatPrice(cart.totalPrice)}</span>
            </div>
            <div className="flex justify-between text-ink-soft">
              <span>Shipping</span>
              <span className="text-sage">Free</span>
            </div>
            <div className="flex justify-between text-base font-semibold text-ink pt-2 border-t border-line">
              <span>Total</span>
              <span>{formatPrice(cart.totalPrice)}</span>
            </div>
          </div>

          <div className="mt-6">
            <FraudShield
              isLoggedIn={!!user}
              addressComplete={Object.values(shippingAddress).every((v) => v && v.trim())}
              orderValue={Number(cart.totalPrice) || 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
