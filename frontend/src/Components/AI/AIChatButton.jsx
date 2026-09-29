import React, { useState } from "react";
import AIChatPanel from "./AIChatPanel";

const AIChatButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[55] flex items-center gap-2 bg-ink text-cream px-4 py-3 text-[11px] uppercase tracking-widest2 shadow-soft hover:bg-plum transition-colors"
        >
          <i className="ri-sparkling-2-fill" />
          Ask ShopShield AI
        </button>
      )}
      <AIChatPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default AIChatButton;
