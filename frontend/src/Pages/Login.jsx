import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Redux/slice/authslice';
import { mergeCart } from '../../Redux/slice/cartSlice';
// Close-up gold/beige fabric texture (Unsplash, free-to-use license — unsplash.com/license),
// no faces, with enough tonal depth for the login text to sit over it.
const loginimg =
  'https://images.unsplash.com/photo-1707569590646-2a51751bb9ef?auto=format&fit=crop&w=1200&q=80';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId, loading, error } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products?.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-1px)]">
      {/* Editorial visual */}
      <div className="relative hidden lg:block">
        <img src={loginimg} alt="ShopShield" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute bottom-10 left-10 right-10 text-cream">
          <p className="eyebrow text-cream/70 mb-3">Verified Fashion Tech</p>
          <h2 className="font-serif text-3xl leading-tight max-w-sm">
            Every account is another set of eyes keeping ShopShield honest.
          </h2>
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <p className="section-eyebrow">Welcome Back</p>
          <h1 className="font-serif text-3xl text-ink mb-8">Sign in to ShopShield</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[11px] uppercase tracking-widest2 text-ink-muted">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-line mt-1"
                required
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-widest2 text-ink-muted">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-line mt-1"
                required
              />
            </div>

            <div className="flex items-center justify-between text-[13px] text-ink-soft">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-plum" />
                Remember me
              </label>
              <a href="#" className="hover:text-plum">Forgot Password?</a>
            </div>

            {error && <p className="text-rust text-sm">{error}</p>}

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? "Signing in…" : "Login"}
            </button>

            <p className="flex items-center gap-2 text-[12px] text-ink-muted pt-2">
              <i className="ri-lock-line text-plum" /> Your data is protected by ShopShield's escrow-grade security.
            </p>
          </form>

          <p className="text-center text-sm text-ink-muted mt-8">
            Don't have an account?{" "}
            <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className="text-plum hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
