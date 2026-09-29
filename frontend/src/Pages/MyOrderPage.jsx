import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserOrders } from '../../Redux/slice/orderSlice';
import { formatPrice } from '../lib/format';
import EmptyState from '../Components/Common/EmptyState';

const MyOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => navigate(`/order/${orderId}`);

  if (loading) return <p className="text-ink-muted py-8">Loading orders…</p>;
  if (error) return <p className="text-rust py-8">Error: {error}</p>;

  return (
    <div>
      <h2 className="font-serif text-xl text-ink mb-5">Order History</h2>

      {orders?.length > 0 ? (
        <div className="card-line overflow-hidden overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-cream-deep text-[10.5px] uppercase tracking-widest2 text-ink-muted">
              <tr>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Placed</th>
                <th className="py-3 px-4">Ships To</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="cursor-pointer hover:bg-cream-deep/60 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={order.orderItems?.[0]?.image}
                        alt=""
                        className="h-12 w-12 object-cover"
                      />
                      <span className="text-ink-soft">{order.orderItems?.[0]?.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-ink-muted">#{order._id.slice(-8)}</td>
                  <td className="py-3 px-4 text-ink-muted">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-ink-muted">
                    {order.shippingAddress?.city}, {order.shippingAddress?.country}
                  </td>
                  <td className="py-3 px-4 text-ink font-medium">{formatPrice(order.totalPrice)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-1 text-[10.5px] uppercase tracking-wide font-medium ${
                        order.isPaid ? 'bg-sage-light text-sage' : 'bg-rust-light text-rust'
                      }`}
                    >
                      {order.isPaid ? 'Paid' : 'Not Paid'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon="ri-shopping-bag-3-line"
          title="No orders yet"
          body="Your verified ShopShield purchases will show up here."
        />
      )}
    </div>
  );
};

export default MyOrderPage;
