import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Redux/slice/authslice';
import { mergeCart } from '../../Redux/slice/cartSlice';
import femaleimg from '../assets/female.jpg';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId, error, loading } = useSelector((state) => state.auth);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }
    setLocalError("");
    await dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-1px)]">
      {/* Form */}
      <div className="flex items-center justify-center px-6 py-16 order-2 lg:order-1">
        <div className="w-full max-w-sm">
          <p className="section-eyebrow">Join ShopShield</p>
          <h1 className="font-serif text-3xl text-ink mb-8">Create your account</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[11px] uppercase tracking-widest2 text-ink-muted">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="input-line mt-1"
                required
              />
            </div>
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
            <div>
              <label className="text-[11px] uppercase tracking-widest2 text-ink-muted">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="input-line mt-1"
                required
              />
            </div>

            {(localError || error) && <p className="text-rust text-sm">{localError || error}</p>}

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? "Creating account…" : "Register"}
            </button>
          </form>

          <p className="text-center text-sm text-ink-muted mt-8">
            Already have an account?{" "}
            <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-plum hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Editorial visual */}
      <div className="relative hidden lg:block order-1 lg:order-2">
        <img src={femaleimg} alt="ShopShield" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute bottom-10 left-10 right-10 text-cream">
          <p className="eyebrow text-cream/70 mb-3">Verified Fashion Tech</p>
          <h2 className="font-serif text-3xl leading-tight max-w-sm">
            Shop with a Reality Score on every listing, from day one.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Register;
