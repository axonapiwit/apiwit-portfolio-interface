"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

type CursorState = "default" | "link" | "project" | "text";

const TRAIL_COUNT = 6;

export default function CyberpunkCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const trailPositions = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }))
  );
  const mousePos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);
  const [supported, setSupported] = useState(false);
  const stateRef = useRef<CursorState>("default");
  const quickOuterX = useRef<gsap.QuickToFunc | null>(null);
  const quickOuterY = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setSupported(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setSupported(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const updateState = useCallback((target: HTMLElement) => {
    const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor") as CursorState | null;
    let next: CursorState = "default";
    if (cursorAttr) next = cursorAttr;
    else if (target.closest("a, button, [role='button']")) next = "link";
    else if (target.closest("input, textarea")) next = "text";

    if (next === stateRef.current) return;
    stateRef.current = next;
    applyState(next);
  }, []);

  const applyState = (s: CursorState) => {
    const outer = outerRef.current;
    const dot = dotRef.current;
    if (!outer || !dot) return;

    switch (s) {
      case "link":
        gsap.to(outer, { width: 48, height: 48, borderColor: "var(--accent)", borderRadius: "9999px", borderStyle: "solid", opacity: 1, duration: 0.3 });
        gsap.to(dot, { width: 4, height: 4, duration: 0.3 });
        break;
      case "project":
        gsap.to(outer, { width: 56, height: 56, borderColor: "var(--accent)", borderRadius: 0, borderStyle: "dashed", opacity: 1, duration: 0.3 });
        gsap.to(dot, { width: 6, height: 6, duration: 0.3 });
        break;
      case "text":
        gsap.to(outer, { width: 2, height: 20, borderRadius: 0, borderColor: "var(--accent)", borderStyle: "solid", opacity: 1, duration: 0.3 });
        gsap.to(dot, { width: 0, height: 0, duration: 0.2 });
        break;
      default:
        gsap.to(outer, { width: 36, height: 36, borderRadius: "9999px", borderColor: "rgba(255,45,45,0.5)", borderStyle: "solid", opacity: 1, duration: 0.3 });
        gsap.to(dot, { width: 6, height: 6, duration: 0.3 });
        break;
    }
  };

  useEffect(() => {
    if (!supported) return;

    const outer = outerRef.current!;
    const dot = dotRef.current!;

    quickOuterX.current = gsap.quickTo(outer, "x", { duration: 0.35, ease: "power3.out" });
    quickOuterY.current = gsap.quickTo(outer, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      quickOuterX.current?.(e.clientX);
      quickOuterY.current?.(e.clientY);
      updateState(e.target as HTMLElement);
    };

    const onLeave = () => gsap.to([outer, dot, ...trailRefs.current], { opacity: 0, duration: 0.2 });
    const onEnter = () => gsap.to([outer, dot], { opacity: 1, duration: 0.2 });

    const animateTrail = () => {
      const { x, y } = mousePos.current;
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const prev = i === 0 ? { x, y } : trailPositions.current[i - 1];
        const pos = trailPositions.current[i];
        const ease = 0.3 - i * 0.03;
        pos.x += (prev.x - pos.x) * ease;
        pos.y += (prev.y - pos.y) * ease;
        const el = trailRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
        }
      }
      rafId.current = requestAnimationFrame(animateTrail);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    rafId.current = requestAnimationFrame(animateTrail);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, [supported, updateState]);

  if (!supported) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailRefs.current[i] = el; }}
          className="absolute -left-[2px] -top-[2px] rounded-full bg-accent will-change-transform"
          style={{
            width: `${4 - i * 0.5}px`,
            height: `${4 - i * 0.5}px`,
            opacity: 0.4 - i * 0.06,
            transform: "translate3d(-100px, -100px, 0)",
          }}
        />
      ))}
      <div
        ref={outerRef}
        className="absolute -left-[18px] -top-[18px] h-9 w-9 rounded-full border border-accent/50 will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
      <div
        ref={dotRef}
        className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-accent will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </div>
  );
}
