import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { clearCart } from '../../Redux/slice/cartSlice';
import { formatPrice } from '../lib/format';
import { withFallback } from '../lib/image';

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/myorders");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkout, dispatch, navigate]);

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  // Note: the checkout API returns the field as `shippingAddress` (matching
  // what Checkout.jsx sends when creating the order) — the previous version
  // of this page read a mistyped `shippingAddres` key here, which threw at
  // render time. Fixed.
  const address = checkout?.shippingAddress;

  return (
    <div className="container-shop py-14 md:py-20 max-w-3xl">
      <div className="text-center mb-10">
        <i className="ri-checkbox-circle-line text-4xl text-sage mb-3" />
        <h1 className="font-serif text-3xl md:text-4xl text-ink">Thank you for your order</h1>
        <p className="text-ink-muted mt-2">
          Your payment is held in escrow until delivery is confirmed as true-to-listing.
        </p>
      </div>

      {checkout && (
        <div className="card-line p-6 md:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between gap-3 pb-6 border-b border-line">
            <div>
              <p className="text-sm text-ink-soft"><span className="font-medium text-ink">Order ID:</span> #{checkout._id.slice(-8)}</p>
              <p className="text-sm text-ink-soft mt-1">
                <span className="font-medium text-ink">Date:</span> {new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>
            <p className="text-sage font-medium text-sm">
              Estimated Delivery: {calculateEstimatedDelivery(checkout.createdAt)}
            </p>
          </div>

          <div>
            <h2 className="text-[11px] uppercase tracking-widest2 text-ink-muted mb-4">Ordered Items</h2>
            <div className="space-y-3">
              {checkout.checkoutItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 border border-line p-3">
                  <img
                    src={withFallback(item.image?.startsWith('http') ? item.image : null, item.productId)}
                    alt={item.name}
                    className="h-16 w-16 object-cover"
                  />
                  <div>
                    <p className="font-medium text-ink capitalize">{item.name}</p>
                    <p className="text-xs text-ink-muted mt-0.5">
                      Color: {item.color} · Size: {item.size?.toUpperCase()} · Qty: {item.quantity}
                    </p>
                    <p className="text-sm text-ink mt-1">{formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h4 className="text-[11px] uppercase tracking-widest2 text-ink-muted mb-2">Payment</h4>
              <p className="text-ink-soft text-sm">{checkout.paymentMethod || 'PayPal'}</p>
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-widest2 text-ink-muted mb-2">Shipping Address</h4>
              {address ? (
                <>
                  <p className="text-ink-soft text-sm">{address.address}</p>
                  <p className="text-ink-soft text-sm">{address.city}, {address.country}</p>
                </>
              ) : (
                <p className="text-ink-muted text-sm">Not available</p>
              )}
            </div>
          </div>

          <Link to="/myorders" className="btn-outline inline-flex">View My Orders</Link>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
