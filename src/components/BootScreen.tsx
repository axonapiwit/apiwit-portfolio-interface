"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface BootScreenProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "loading kernel modules...",
  "mounting /dev/portfolio...",
  "initializing GPU pipeline...",
  "compiling shaders...",
  "establishing neural link...",
];

const PROGRESS_STEPS = [
  { to: 28, duration: 0.6, ease: "power1.out" },
  { to: 45, duration: 0.8, ease: "power1.inOut" },
  { to: 72, duration: 0.5, ease: "power2.out" },
  { to: 89, duration: 0.9, ease: "sine.inOut" },
  { to: 100, duration: 0.4, ease: "power1.in" },
];

export default function BootScreen({ onComplete }: BootScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const logsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }

    const title = titleRef.current!;
    const bar = barRef.current!;
    const percent = percentRef.current!;
    const container = containerRef.current!;
    const logs = logsRef.current!;
    const fullText = "APIWIT.EXE";

    gsap.killTweensOf([container, bar, title, percent]);
    title.textContent = "";
    bar.style.width = "0%";
    percent.textContent = "0%";
    logs.innerHTML = "";
    container.style.opacity = "1";

    const appendLog = (text: string, accent = false) => {
      const line = document.createElement("div");
      line.textContent = `> ${text}`;
      if (accent) line.style.color = "var(--accent)";
      line.style.opacity = "0";
      logs.appendChild(line);
      gsap.to(line, { opacity: 1, duration: 0.25 });
      logs.scrollTop = logs.scrollHeight;
    };

    const updateBar = (v: number) => {
      bar.style.width = `${v}%`;
      percent.textContent = `${v}%`;
    };

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(container, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete,
        });
      },
    });

    tl.to(
      {},
      {
        duration: fullText.length * 0.09,
        delay: 0.4,
        onUpdate: function () {
          const chars = Math.floor(this.progress() * fullText.length);
          title.textContent =
            fullText.slice(0, chars) + (chars < fullText.length ? "_" : "");
        },
      },
    );

    const counter = { val: 0 };

    PROGRESS_STEPS.forEach((step, i) => {
      tl.to(counter, {
        val: step.to,
        duration: step.duration,
        ease: step.ease,
        onUpdate: () => updateBar(Math.round(counter.val)),
        onStart: () => {
          if (i < BOOT_LOGS.length) appendLog(BOOT_LOGS[i]);
        },
      });
    });

    tl.call(() => appendLog("system ready.", true));
    tl.to({}, { duration: 0.6 });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-bg-primary"
    >
      <div
        ref={titleRef}
        className="font-(family-name:--font-kanit) text-3xl font-semibold text-accent md:text-5xl"
      />

      <div className="mt-8 flex items-center gap-3">
        <div className="h-1 w-60 overflow-hidden rounded-full bg-white/10 md:w-80">
          <div
            ref={barRef}
            className="h-full w-0 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]"
          />
        </div>
        <span
          ref={percentRef}
          className="w-10 font-mono text-xs text-text-secondary"
        >
          0%
        </span>
      </div>

      <div
        ref={logsRef}
        className="mt-6 flex h-32 w-60 flex-col overflow-y-auto font-mono text-[11px] leading-relaxed text-text-secondary/70 md:w-80"
      />
    </div>
  );
}
