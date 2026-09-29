import React from "react";

const EmptyState = ({ icon = "ri-shopping-bag-3-line", title, body, tone = "default" }) => (
  <div className="w-full py-20 flex flex-col items-center justify-center text-center border border-dashed border-line bg-cream-soft">
    <i
      className={`${icon} text-3xl mb-3 ${tone === "error" ? "text-rust" : "text-ink-muted"}`}
    />
    <p className="font-serif text-lg text-ink mb-1">{title}</p>
    {body && <p className="text-sm text-ink-muted max-w-sm">{body}</p>}
  </div>
);

export default EmptyState;
