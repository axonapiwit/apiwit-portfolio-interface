"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const BREAKPOINT = 768;
const DEBOUNCE_MS = 150;

interface BreakpointTransitionProps {
  disabled?: boolean;
}

export default function BreakpointTransition({ disabled }: BreakpointTransitionProps) {
  const [show, setShow] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const prevZone = useRef<"mobile" | "desktop">(
    typeof window !== "undefined"
      ? window.innerWidth >= BREAKPOINT ? "desktop" : "mobile"
      : "desktop"
  );

  useEffect(() => {
    if (disabled) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: ReturnType<typeof setTimeout>;

    prevZone.current = window.innerWidth >= BREAKPOINT ? "desktop" : "mobile";

    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const zone = window.innerWidth >= BREAKPOINT ? "desktop" : "mobile";
        if (zone !== prevZone.current) {
          prevZone.current = zone;
          if (prefersReduced) return;
          setShow(true);
        }
      }, DEBOUNCE_MS);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timer);
    };
  }, [disabled]);

  useEffect(() => {
    if (!show || !overlayRef.current) return;
    const el = overlayRef.current;

    const tl = gsap.timeline({
      onComplete: () => setShow(false),
    });
    tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    tl.to({}, { duration: 0.6 });
    tl.to(el, { opacity: 0, duration: 0.2 });

    return () => { tl.kill(); };
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg-primary"
    >
      <span className="font-mono text-sm text-text-secondary">
        reconnecting<span className="animate-pulse">_</span>
      </span>
    </div>
  );
}
