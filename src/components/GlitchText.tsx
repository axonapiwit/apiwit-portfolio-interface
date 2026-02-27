"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>[]{}";

interface GlitchTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}

export default function GlitchText({
  text,
  className,
  duration = 1,
  delay = 0,
  as: Tag = "span",
}: GlitchTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.textContent = text;
      return;
    }

    el.textContent = "";
    const iterations = Math.ceil(duration * 30);
    let frame = 0;

    const anim = gsap.to({}, {
      duration,
      delay,
      onUpdate() {
        frame++;
        const progress = frame / iterations;
        const settled = Math.floor(progress * text.length);
        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") {
            result += " ";
          } else if (i < settled) {
            result += text[i];
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        el.textContent = result;
      },
      onComplete() {
        el.textContent = text;
      },
    });

    return () => { anim.kill(); };
  }, [text, duration, delay]);

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  );
}
