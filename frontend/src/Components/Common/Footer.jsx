import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("You're on the list for verified price drops.", { duration: 1800 });
    setEmail("");
  };

  return (
    <footer className="bg-ink text-cream/85">
      <div className="container-shop grid grid-cols-1 gap-12 py-16 md:grid-cols-4">
        {/* Brand + newsletter */}
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <span className="flex h-8 w-8 items-center justify-center bg-plum text-cream font-serif text-base">S</span>
            <span className="font-serif text-lg text-cream">SHOPSHIELD</span>
          </Link>
          <p className="italic text-cream/60 mb-4">"Shop Smarter. Know What You're Buying."</p>
          <p className="text-sm text-cream/60 mb-6 leading-relaxed">
            ShopShield is the audited fashion-tech destination ensuring fabric composition truth,
            verified customer deliveries, and escrow payment protections across every garment.
          </p>

          <p className="text-[11px] uppercase tracking-widest2 text-cream/50 mb-2">The Transparency Dispatch</p>
          <form onSubmit={handleSubscribe} className="flex border border-cream/25">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full bg-transparent px-3 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
            />
            <button type="submit" className="px-4 text-cream/80 hover:text-cream">
              <i className="ri-mail-line" />
            </button>
          </form>
        </div>

        {/* Departments */}
        <div>
          <h3 className="mb-4 text-[11px] uppercase tracking-widest2 text-cream/50">Departments</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/collection/all?gender=Women" className="hover:text-cream transition-colors">Women's Tailoring</Link></li>
            <li><Link to="/collection/all?gender=Men" className="hover:text-cream transition-colors">Men's Classic Weaves</Link></li>
            <li><Link to="/collection/all?category=Top+Wear" className="hover:text-cream transition-colors">Top Wear &amp; Knitwear</Link></li>
            <li><Link to="/collection/all?category=Bottom+Wear" className="hover:text-cream transition-colors">Bottom Wear &amp; Trousers</Link></li>
            <li><Link to="/collection/all" className="hover:text-cream transition-colors">All Verified Garments</Link></li>
          </ul>
        </div>

        {/* Reality protocol */}
        <div>
          <h3 className="mb-4 text-[11px] uppercase tracking-widest2 text-cream/50">The Reality Protocol</h3>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-2"><i className="ri-checkbox-circle-line text-sage" /> Reality Score™ Standards</li>
            <li className="flex items-center gap-2"><i className="ri-checkbox-circle-line text-sage" /> Zero Synthetic Renders</li>
            <li className="flex items-center gap-2"><i className="ri-checkbox-circle-line text-sage" /> Merchant Audit System</li>
            <li className="flex items-center gap-2"><i className="ri-checkbox-circle-line text-sage" /> Verified Buyer Photos</li>
            <li className="flex items-center gap-2"><i className="ri-checkbox-circle-line text-sage" /> Fair Price Monitoring</li>
          </ul>
        </div>

        {/* Buyer protection */}
        <div>
          <h3 className="mb-4 text-[11px] uppercase tracking-widest2 text-cream/50">Buyer Protection</h3>
          <ul className="space-y-2.5 text-sm mb-6">
            <li className="flex items-center gap-2"><i className="ri-lock-line" /> Escrow Held Payments</li>
            <li><Link to="/myorders" className="hover:text-cream transition-colors">Track Deliveries</Link></li>
            <li>30-Day True-to-Image Returns</li>
            <li>Anti-Fraud Resolution</li>
          </ul>

          <p className="text-[11px] uppercase tracking-widest2 text-cream/50 mb-2">Follow Us</p>
          <div className="flex items-center gap-3 mb-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Meta" className="hover:text-cream"><i className="ri-facebook-circle-line text-lg" /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-cream"><i className="ri-instagram-line text-lg" /></a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-cream"><i className="ri-twitter-x-line text-lg" /></a>
          </div>
          <p className="text-sm text-cream/60 flex items-center gap-2">
            <i className="ri-phone-line" /> +91 90081 55041
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-shop py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream/45">
          <p><i className="ri-copyright-line mr-1" />2026 ShopShield. All rights reserved.</p>
          <p>Reality scores and seller-trust metrics shown are demo data for this project.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
