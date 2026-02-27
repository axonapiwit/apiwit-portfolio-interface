"use client";

import { useEffect, useRef, useCallback } from "react";

const DATA_STREAMS = [
  { left: "8%", duration: "6s", delay: "0s" },
  { left: "24%", duration: "8s", delay: "1.2s" },
  { left: "52%", duration: "5s", delay: "2.8s" },
  { left: "73%", duration: "7s", delay: "0.6s" },
  { left: "91%", duration: "9s", delay: "3.4s" },
];

export default function CyberpunkBackground() {
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: MouseEvent) => {
    const el = glowRef.current;
    if (!el) return;
    el.style.setProperty("--glow-x", `${e.clientX}px`);
    el.style.setProperty("--glow-y", `${e.clientY}px`);
    el.style.opacity = "1";
  }, []);

  const handleLeave = useCallback(() => {
    const el = glowRef.current;
    if (el) el.style.opacity = "0";
  }, []);

  useEffect(() => {
    const section = glowRef.current?.parentElement;
    if (!section) return;
    section.addEventListener("mousemove", handleMove);
    section.addEventListener("mouseleave", handleLeave);
    return () => {
      section.removeEventListener("mousemove", handleMove);
      section.removeEventListener("mouseleave", handleLeave);
    };
  }, [handleMove, handleLeave]);

  return (
    <>
      {/* Perspective Grid Floor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] overflow-hidden"
        style={{ perspective: "400px" }}
      >
        <div
          className="absolute inset-0 animate-[cyberGridScroll_2s_linear_infinite]"
          style={{
            transformOrigin: "center top",
            transform: "rotateX(60deg)",
            backgroundImage:
              "linear-gradient(rgba(255,45,45,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,45,0.12) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 40%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 40%)",
          }}
        />
      </div>

      {/* Mouse-reactive Glow */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-1 opacity-0 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(255,45,45,0.07), transparent 60%)",
        }}
      />

      {/* Scan Lines (CRT) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-2 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 4px)",
        }}
      />

      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-2"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 50%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Horizontal Accent Lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-[22%] z-3 h-px animate-[cyberFlicker_4s_ease_infinite] bg-accent/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-[78%] z-3 h-px animate-[cyberFlicker_4s_ease_infinite_0.7s] bg-accent/20"
      />

      {/* Vertical Data Streams */}
      {DATA_STREAMS.map((s, i) => (
        <div
          key={i}
          aria-hidden
          className="pointer-events-none absolute top-0 z-2 h-[15vh] w-px bg-linear-to-b from-transparent via-accent/25 to-transparent"
          style={{
            left: s.left,
            animation: `cyberDataFlow ${s.duration} linear ${s.delay} infinite`,
          }}
        />
      ))}

      {/* HUD Corner Brackets + Labels */}
      {/* <HudCorners /> */}
    </>
  );
}

function HudCorners() {
  const bracket = "absolute border-accent/40 pointer-events-none z-4";
  const size = "h-6 w-6 md:h-8 md:w-8";

  return (
    <>
      <span
        className={`${bracket} ${size} top-4 left-4 border-t border-l md:top-6 md:left-6`}
      />
      <span
        className={`${bracket} ${size} top-4 right-4 border-t border-r md:top-6 md:right-6`}
      />
      <span
        className={`${bracket} ${size} bottom-4 left-4 border-b border-l md:bottom-6 md:left-6`}
      />
      <span
        className={`${bracket} ${size} bottom-4 right-4 border-b border-r md:bottom-6 md:right-6`}
      />

      <span className="pointer-events-none absolute top-5 left-12 z-4 animate-[cyberFlicker_4s_ease_infinite_1.2s] font-mono text-[10px] tracking-widest text-accent/40 md:top-7 md:left-14">
        SYS://HERO_01
      </span>
      <span className="pointer-events-none absolute bottom-5 right-12 z-4 animate-[cyberFlicker_4s_ease_infinite_2.5s] font-mono text-[10px] tracking-widest text-accent/40 md:bottom-7 md:right-14">
        v2.077
      </span>
    </>
  );
}
