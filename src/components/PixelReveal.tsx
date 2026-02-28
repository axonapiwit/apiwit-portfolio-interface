"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

function shuffle(n: number) {
  const indices = Array.from({ length: n }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

interface PixelRevealProps {
  active?: boolean;
  cols?: number;
  rows?: number;
  duration?: number;
  staggerMax?: number;
}

export default function PixelReveal({
  active = false,
  cols = 20,
  rows = 10,
  duration = 0.4,
  staggerMax = 1.2,
}: PixelRevealProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const hasPlayed = useRef(false);
  const total = cols * rows;
  const shuffledRef = useRef<number[]>(shuffle(total));

  useEffect(() => {
    shuffledRef.current = shuffle(total);
  }, [total]);

  useEffect(() => {
    if (!active || hasPlayed.current || !gridRef.current) return;
    hasPlayed.current = true;

    const cells = gridRef.current.children;
    const ordered = shuffledRef.current.map((i) => cells[i]);

    gsap.to(ordered, {
      opacity: 0,
      scale: 0.5,
      duration,
      stagger: staggerMax / total,
      ease: "power2.in",
      onComplete: () => {
        if (gridRef.current) gridRef.current.style.display = "none";
      },
    });
  }, [active, total, duration, staggerMax]);

  return (
    <div
      ref={gridRef}
      className="pointer-events-none absolute inset-0 z-50 grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
      aria-hidden
    >
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="bg-bg-primary" />
      ))}
    </div>
  );
}
