import React, { useState } from "react";
import { toast } from "sonner";
import { formatPrice } from "../../lib/format";

// There is no live "offers" API on the backend yet. The counter-offer shown
// below is a deterministic local simulation (roughly the midpoint between
// the buyer's offer and the listed price, floored at 90% of list) so the
// interaction is demo-able end to end — it is clearly labelled as such and
// never presented as a real seller response.
const simulateCounter = (offer, price) => {
  const floor = Math.round(price * 0.9);
  const midpoint = Math.round((offer + price) / 2);
  return Math.max(offer, Math.min(price, Math.max(midpoint, floor)));
};

const OfferModal = ({ open, onClose, product }) => {
  const [amount, setAmount] = useState("");
  const [stage, setStage] = useState("form"); // form | countered | accepted

  if (!open) return null;

  const price = Number(product?.price) || 0;
  const offer = Number(amount) || 0;
  const counter = simulateCounter(offer, price);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    if (offer >= price) {
      setStage("accepted");
      toast.success("Offer matches the listed price — accepted", { duration: 1800 });
    } else {
      setStage("countered");
    }
  };

  const acceptCounter = () => {
    setStage("accepted");
    toast.success("Counter-offer accepted for this session", { duration: 1800 });
  };

  const reset = () => {
    setStage("form");
    setAmount("");
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-[1px]" onClick={onClose} />
      <div className="relative w-full sm:max-w-md bg-cream-soft border border-line sm:rounded-sm p-6 animate-slide-up">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="section-eyebrow mb-1">Make an Offer</p>
            <h3 className="font-serif text-xl text-ink">{product?.name || "This item"}</h3>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-ink-muted hover:text-ink">
            <i className="ri-close-line text-xl" />
          </button>
        </div>

        {stage === "accepted" && (
          <div className="py-6 text-center">
            <i className="ri-checkbox-circle-line text-3xl text-sage mb-2" />
            <p className="text-ink-soft text-sm">
              Deal noted at {formatPrice(offer >= price ? price : counter)} for this session. Real
              offer-matching with sellers is coming soon.
            </p>
          </div>
        )}

        {stage === "countered" && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-[10.5px] uppercase tracking-widest2 text-ink-muted mb-1">Listed</p>
                <p className="font-serif text-lg text-ink">{formatPrice(price)}</p>
              </div>
              <div>
                <p className="text-[10.5px] uppercase tracking-widest2 text-ink-muted mb-1">Your Offer</p>
                <p className="font-serif text-lg text-ink">{formatPrice(offer)}</p>
              </div>
              <div>
                <p className="text-[10.5px] uppercase tracking-widest2 text-plum mb-1">Counter</p>
                <p className="font-serif text-lg text-plum">{formatPrice(counter)}</p>
              </div>
            </div>
            <p className="text-[12.5px] text-ink-muted text-center">
              A simulated seller counter-offer — real seller negotiation is not yet connected.
            </p>
            <div className="flex gap-3">
              <button onClick={reset} className="btn-outline flex-1">
                Try Again
              </button>
              <button onClick={acceptCounter} className="btn-plum flex-1">
                Accept {formatPrice(counter)}
              </button>
            </div>
          </div>
        )}

        {stage === "form" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-ink-soft">
              Listed price{" "}
              <span className="font-medium text-ink">{formatPrice(price)}</span>. Tell us what
              you'd pay.
            </p>
            <div>
              <label className="text-[11px] uppercase tracking-widest2 text-ink-muted">
                Your offer (₹)
              </label>
              <input
                type="number"
                min="1"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input-line mt-1"
                placeholder="e.g. 1200"
              />
            </div>
            <button type="submit" className="btn-plum w-full">
              Submit Offer
            </button>
            <p className="text-[11px] text-ink-muted text-center">
              Demo interaction — not yet connected to a live offers backend.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default OfferModal;
