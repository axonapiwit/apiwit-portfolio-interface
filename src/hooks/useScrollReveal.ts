"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealItem {
  target: () => Element | HTMLCollection | NodeListOf<Element> | null | undefined;
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  stagger?: number;
  delay?: number;
}

export default function useScrollReveal(
  triggerRef: RefObject<HTMLElement | null>,
  items: RevealItem[],
) {
  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const tweens: gsap.core.Tween[] = [];

    items.forEach(({ target, from, to, stagger, delay }) => {
      const el = target();
      if (!el) return;

      const tween = gsap.fromTo(el, from, {
        ...to,
        duration: to.duration ?? 0.6,
        ease: to.ease ?? "power2.out",
        stagger: stagger ?? 0,
        delay: delay ?? 0,
        scrollTrigger: {
          trigger,
          start: "top 75%",
          once: true,
        },
      });
      tweens.push(tween);
    });

    return () => {
      tweens.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === trigger) st.kill();
      });
    };
  }, [triggerRef, items]);
}
