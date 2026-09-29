import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchOrderDetails } from '../../Redux/slice/orderSlice';
import { formatPrice } from '../lib/format';

const StatusPill = ({ good, goodLabel, badLabel }) => (
  <span
    className={`px-3 py-1 text-[11px] uppercase tracking-widest2 font-medium ${
      good ? 'bg-sage-light text-sage' : 'bg-rust-light text-rust'
    }`}
  >
    {good ? goodLabel : badLabel}
  </span>
);

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  if (loading) return <p className="container-shop py-24 text-ink-muted">Loading order…</p>;
  if (error) return <p className="container-shop py-24 text-rust">Error: {error}</p>;

  return (
    <div className="container-shop py-10 md:py-14">
      <p className="section-eyebrow">Order Details</p>
      <h1 className="section-title mb-8">Track Your Purchase</h1>

      {!orderDetails ? (
        <p className="text-ink-muted">No order details found.</p>
      ) : (
        <div className="card-line p-6 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8 pb-6 border-b border-line">
            <div>
              <h3 className="font-serif text-lg text-ink">Order #{orderDetails._id.slice(-8)}</h3>
              <p className="text-ink-muted text-sm mt-1">
                Placed {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex sm:flex-col items-start sm:items-end gap-2">
              <StatusPill good={orderDetails.isPaid} goodLabel="Paid" badLabel="Not Paid" />
              <StatusPill good={orderDetails.isDelivered} goodLabel="Delivered" badLabel="Not Delivered" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-[11px] uppercase tracking-widest2 text-ink-muted mb-2">Payment</h4>
              <p className="text-ink-soft text-sm">Method: {orderDetails.paymentMethod}</p>
              <p className="text-ink-soft text-sm">Status: {orderDetails.isPaid ? 'Paid' : 'Unpaid'}</p>
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-widest2 text-ink-muted mb-2">Shipping</h4>
              <p className="text-ink-soft text-sm">Method: {orderDetails.shippingMethod || 'Standard'}</p>
              <p className="text-ink-soft text-sm">
                Address: {orderDetails.shippingAddress?.city}, {orderDetails.shippingAddress?.country}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto mb-8">
            <h4 className="text-[11px] uppercase tracking-widest2 text-ink-muted mb-3">Ordered Items</h4>
            <table className="min-w-full text-sm">
              <thead className="bg-cream-deep text-[10.5px] uppercase tracking-widest2 text-ink-muted">
                <tr>
                  <th className="px-4 py-2.5 text-left">Product</th>
                  <th className="px-4 py-2.5 text-left">Price</th>
                  <th className="px-4 py-2.5 text-left">Qty</th>
                  <th className="px-4 py-2.5 text-left">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {orderDetails.orderItems.map((item) => (
                  <tr key={item.productId}>
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="h-12 w-12 object-cover" />
                      <Link to={`/product/${item.productId}`} className="text-ink hover:text-plum font-medium">
                        {item.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-ink-soft">{formatPrice(item.price)}</td>
                    <td className="px-4 py-3 text-ink-soft">{item.quantity}</td>
                    <td className="px-4 py-3 text-ink font-medium">{formatPrice(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link to="/myorders" className="btn-outline">
            Back to Orders
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
