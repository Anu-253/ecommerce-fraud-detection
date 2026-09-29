import React, { useState, useRef, useEffect } from "react";

const SUGGESTED = [
  "Can I trust this product?",
  "What's the Reality Score?",
  "Is this price good?",
  "Tell me about the seller.",
];

// There is no live chat/LLM endpoint wired into the backend yet. This panel
// is a fully working UI shell — ready to POST to a real endpoint the moment
// one exists (see `sendToShopShieldAI` below) — but it never fabricates a
// real AI response in the meantime.
async function sendToShopShieldAI(message) {
  // TODO: replace with a real request, e.g.
  // const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ai/chat`, { message });
  // return res.data.reply;
  console.debug("ShopShield AI (demo): received message ->", message);
  await new Promise((r) => setTimeout(r, 450));
  return "ShopShield AI isn't connected to a live model yet in this build — this panel is wired and ready for that integration. In the meantime, check a product's Trust Dossier for its Reality Score, Seller Trust and verified-photo counts.";
}

const AIChatPanel = ({ open, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const handleSend = async (text) => {
    const message = (text ?? input).trim();
    if (!message || sending) return;
    setMessages((m) => [...m, { role: "user", text: message }]);
    setInput("");
    setSending(true);
    const reply = await sendToShopShieldAI(message);
    setMessages((m) => [...m, { role: "assistant", text: reply }]);
    setSending(false);
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[65] bg-ink/20 sm:hidden" onClick={onClose} />
      <div className="fixed right-0 top-0 z-[70] flex h-full w-full flex-col bg-cream-soft shadow-2xl sm:w-[26rem] border-l border-line animate-slide-up">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-plum text-cream">
              <i className="ri-shield-check-line" />
            </span>
            <div>
              <p className="font-serif text-base text-ink leading-none">ShopShield Intelligence</p>
              <p className="text-[10.5px] text-sage mt-1 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-sage" /> Product Authenticity &amp; Verification Advisor
              </p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-ink-muted hover:text-ink">
            <i className="ri-close-line text-xl" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6">
          {messages.length === 0 ? (
            <div className="text-center mt-6">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-line mb-5">
                <i className="ri-shield-check-line text-2xl text-plum" />
              </span>
              <h3 className="font-serif text-xl text-ink mb-2">How can ShopShield assist you?</h3>
              <p className="text-sm text-ink-muted mb-8 max-w-xs mx-auto">
                Ask about true-to-life fit, fabric authenticity, price drop history, or seller
                reliability metrics.
              </p>

              <p className="text-[11px] uppercase tracking-widest2 text-ink-muted mb-3 text-left">
                Suggested Questions
              </p>
              <div className="flex flex-col gap-2">
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="flex items-center justify-between border border-line bg-cream px-4 py-3 text-left text-sm text-ink-soft hover:border-plum hover:text-ink transition-colors"
                  >
                    {q}
                    <i className="ri-send-plane-line text-ink-muted" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "self-end bg-ink text-cream"
                      : "self-start border border-line bg-cream text-ink-soft"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {sending && (
                <div className="self-start border border-line bg-cream text-ink-muted px-4 py-3 text-sm">
                  Thinking…
                </div>
              )}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="border-t border-line p-4"
        >
          <div className="flex items-center gap-2 border border-line bg-cream px-3 py-2 focus-within:border-ink">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about reality scores, fit, or pricing…"
              className="w-full bg-transparent text-sm focus:outline-none"
            />
            <button type="submit" aria-label="Send" className="text-plum">
              <i className="ri-send-plane-fill" />
            </button>
          </div>
          <p className="mt-2 text-center text-[10.5px] text-ink-muted">
            ShopShield AI provides verified authenticity guidance based on audited garment parameters.
          </p>
        </form>
      </div>
    </>
  );
};

export default AIChatPanel;
