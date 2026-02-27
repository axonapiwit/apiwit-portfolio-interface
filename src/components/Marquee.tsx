"use client";

import { clsx } from "clsx";

interface MarqueeProps {
  children: string;
  repeat?: number;
  className?: string;
  speed?: number;
}

export default function Marquee({ children, repeat = 4, className, speed = 30 }: MarqueeProps) {
  const duration = (children.length * repeat) / speed;

  return (
    <div
      className={clsx(
        "overflow-hidden border-y border-white/5 py-3",
        className
      )}
    >
      <div
        className="flex w-max animate-[marquee_var(--duration)_linear_infinite] whitespace-nowrap"
        style={{ "--duration": `${duration}s` } as React.CSSProperties}
      >
        {Array.from({ length: repeat * 2 }).map((_, i) => (
          <span
            key={i}
            className="mr-8 font-mono text-xs tracking-widest text-text-dim uppercase"
          >
            {children}
          </span>
        ))}
      </div>
    </div>
  );
}
