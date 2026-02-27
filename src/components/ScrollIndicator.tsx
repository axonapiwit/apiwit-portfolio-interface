"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <ChevronDown className="h-5 w-5 animate-bounce text-text-dim" strokeWidth={1.5} />
    </div>
  );
}
