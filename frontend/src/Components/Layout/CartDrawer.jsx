import React from 'react';
import { createPortal } from 'react-dom';
import Cartcontent from '../cart/Cartcontent';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatPrice } from '../../lib/format';

const CartDrawer = ({ draweropen, handlecartdrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const handlecheckout = () => {
    handlecartdrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return createPortal(
    <>
      {draweropen && (
        <div className="fixed inset-0 z-40 bg-ink/30" onClick={handlecartdrawer} />
      )}
      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-3/4 flex-col bg-cream-soft shadow-xl transition-transform duration-300 sm:w-1/2 md:w-[26rem] ${
          draweropen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-line p-5">
          <h2 className="font-serif text-xl text-ink">Your Cart</h2>
          <button onClick={handlecartdrawer} aria-label="Close cart" className="text-ink hover:text-plum">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-5">
          {cart && cart?.products?.length > 0 ? (
            <Cartcontent cart={cart} userId={userId} guestId={guestId} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center text-ink-muted">
              <i className="ri-shopping-bag-3-line text-3xl mb-3"></i>
              <p>Your cart is empty.</p>
            </div>
          )}
        </div>

        <div className="border-t border-line p-5">
          {cart && cart?.products?.length > 0 && (
            <>
              <div className="mb-3 flex items-center justify-between text-sm text-ink-soft">
                <span className="flex items-center gap-1.5"><i className="ri-lock-line text-plum" /> Escrow-protected checkout</span>
                <span className="font-semibold text-ink">{formatPrice(cart.totalPrice)}</span>
              </div>
              <button onClick={handlecheckout} className="btn-primary w-full">
                Checkout
              </button>
              <p className="mt-2 text-center text-[11px] text-ink-muted">
                Shipping, taxes, and discounts are calculated at checkout.
              </p>
            </>
          )}
        </div>
      </div>
    </>,
    document.body
  );
};

export default CartDrawer;
