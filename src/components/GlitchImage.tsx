"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";

interface GlitchImageProps {
  src: string;
  alt: string;
}

export default function GlitchImage({ src, alt }: GlitchImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const rafId = useRef(0);
  const glitchAmount = useRef(0);
  const isHovering = useRef(false);

  const drawCover = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) => {
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = w / h;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
    if (imgRatio > canvasRatio) {
      sw = img.naturalHeight * canvasRatio;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / canvasRatio;
      sy = (img.naturalHeight - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
  }, []);

  const drawGlitch = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const amount = glitchAmount.current;

    ctx.clearRect(0, 0, w, h);
    drawCover(ctx, img, w, h);

    if (amount < 0.01) return;

    const sliceHeight = Math.max(2, Math.floor(4 + amount * 8));
    const time = performance.now() * 0.003;

    for (let y = 0; y < h; y += sliceHeight) {
      const sliceH = Math.min(sliceHeight, h - y);
      const wave = Math.sin((y / h) * Math.PI * (3 + amount * 4) + time) * amount * w * 0.15;
      const jitter = (Math.random() - 0.5) * amount * w * 0.05;
      const offset = wave + jitter;

      ctx.drawImage(canvas, 0, y, w, sliceH, offset, y, w, sliceH);
    }

    if (amount > 0.3) {
      const rgbShift = amount * 8;
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = amount * 0.4;

      ctx.save();
      ctx.translate(-rgbShift, 0);
      drawCover(ctx, img, w, h);
      ctx.restore();
      ctx.fillStyle = "rgba(255, 0, 0, 0.15)";
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(rgbShift, 0);
      drawCover(ctx, img, w, h);
      ctx.restore();
      ctx.fillStyle = "rgba(0, 200, 255, 0.12)";
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
    }

    if (amount > 0.2) {
      const numSlices = Math.floor(amount * 6);
      for (let i = 0; i < numSlices; i++) {
        const sy = Math.floor(Math.random() * h);
        const sh = Math.floor(Math.random() * 10 + 2);
        const sx = (Math.random() - 0.5) * amount * w * 0.3;
        ctx.drawImage(canvas, 0, sy, w, sh, sx, sy, w, sh);
      }
    }
  }, [drawCover]);

  const animateRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    animateRef.current = () => {
      drawGlitch();
      rafId.current = requestAnimationFrame(() => animateRef.current?.());
    };
  }, [drawGlitch]);

  const triggerGlitch = useCallback(() => {
    gsap.killTweensOf(glitchAmount);
    gsap.to(glitchAmount, {
      current: 1,
      duration: 0.15,
      ease: "power2.in",
      onComplete: () => {
        gsap.to(glitchAmount, {
          current: isHovering.current ? 0.15 : 0,
          duration: 0.8,
          ease: "power2.out",
        });
      },
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      imgRef.current = img;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio > 1 ? 2 : 1);
      canvas.height = rect.height * (window.devicePixelRatio > 1 ? 2 : 1);
      drawGlitch();
    };

    const onResize = () => {
      if (!imgRef.current) return;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio > 1 ? 2 : 1);
      canvas.height = rect.height * (window.devicePixelRatio > 1 ? 2 : 1);
    };
    window.addEventListener("resize", onResize);

    rafId.current = requestAnimationFrame(() => animateRef.current?.());

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) {
      const loop = () => {
        const delay = gsap.utils.random(3, 6);
        gsap.delayedCall(delay, () => {
          if (!isHovering.current) triggerGlitch();
          loop();
        });
      };
      loop();
    }

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", onResize);
      gsap.killTweensOf(glitchAmount);
    };
  }, [src, drawGlitch, triggerGlitch]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-square overflow-hidden bg-bg-secondary"
      onMouseEnter={() => {
        isHovering.current = true;
        triggerGlitch();
      }}
      onMouseLeave={() => {
        isHovering.current = false;
        gsap.to(glitchAmount, { current: 0, duration: 0.6, ease: "power2.out" });
      }}
    >
      <Image src={src} alt={alt} fill className="object-cover" priority />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.08)_3px,rgba(0,0,0,0.08)_6px)]" />
    </div>
  );
}
