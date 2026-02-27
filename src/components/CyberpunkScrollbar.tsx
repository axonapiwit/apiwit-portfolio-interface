"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const TRACK_W = 10;
const CUT = 6;

export default function CyberpunkScrollbar() {
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartScroll = useRef(0);
  const [thumb, setThumb] = useState({ top: 0, height: 0 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const calc = useCallback(() => {
    const doc = document.documentElement;
    const viewH = window.innerHeight;
    const scrollH = doc.scrollHeight;
    if (scrollH <= viewH) { setVisible(false); return; }
    setVisible(true);
    const ratio = viewH / scrollH;
    const thumbH = Math.max(ratio * viewH, 40);
    const maxTop = viewH - thumbH;
    const scrollTop = window.scrollY || doc.scrollTop;
    const top = (scrollTop / (scrollH - viewH)) * maxTop;
    setThumb({ top, height: thumbH });
  }, []);

  const showTemporary = useCallback(() => {
    setHovered(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (!dragging.current) setHovered(false);
    }, 1200);
  }, []);

  useEffect(() => {
    calc();
    const onScroll = () => { calc(); showTemporary(); };
    const onResize = () => calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [calc, showTemporary]);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    dragging.current = true;
    dragStartY.current = e.clientY;
    dragStartScroll.current = window.scrollY;
    document.body.style.userSelect = "none";
    setHovered(true);
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const doc = document.documentElement;
      const viewH = window.innerHeight;
      const scrollH = doc.scrollHeight;
      const maxTop = viewH - thumb.height;
      const dy = e.clientY - dragStartY.current;
      const scrollDelta = (dy / maxTop) * (scrollH - viewH);
      window.scrollTo(0, dragStartScroll.current + scrollDelta);
    };
    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.userSelect = "";
      showTemporary();
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [thumb.height, showTemporary]);

  const onTrackClick = (e: React.MouseEvent) => {
    if (e.target === thumbRef.current) return;
    const rect = trackRef.current!.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const doc = document.documentElement;
    const ratio = clickY / rect.height;
    window.scrollTo({ top: ratio * (doc.scrollHeight - window.innerHeight), behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <div
      ref={trackRef}
      onClick={onTrackClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => { if (!dragging.current) setHovered(false); }}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: TRACK_W + 4,
        height: "100vh",
        zIndex: 9999,
        cursor: "pointer",
        opacity: hovered ? 1 : 0.35,
        transition: "opacity .3s",
      }}
    >
      {/* track line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 1,
          height: "100%",
          background: "var(--border-accent)",
        }}
      />
      {/* thumb */}
      <div
        ref={thumbRef}
        onPointerDown={onPointerDown}
        style={{
          position: "absolute",
          right: 0,
          top: thumb.top,
          width: TRACK_W,
          height: thumb.height,
          cursor: "grab",
          transition: dragging.current ? "none" : "top .08s linear",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: hovered
              ? "linear-gradient(180deg, var(--accent) 0%, #ff5555 50%, var(--accent) 100%)"
              : "linear-gradient(180deg, var(--accent-dim) 0%, var(--accent) 50%, var(--accent-dim) 100%)",
            clipPath: `polygon(
              0 ${CUT}px,
              ${CUT}px 0,
              100% 0,
              100% calc(100% - ${CUT}px),
              calc(100% - ${CUT}px) 100%,
              0 100%
            )`,
            boxShadow: hovered ? "0 0 12px var(--accent-glow), inset 0 0 8px rgba(255,45,45,0.2)" : "none",
            transition: "background .2s, box-shadow .2s",
          }}
        />
        {/* top corner accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: CUT + 2,
            height: 1,
            background: "var(--accent)",
            transform: `rotate(-45deg)`,
            transformOrigin: "top left",
            opacity: hovered ? 1 : 0,
            transition: "opacity .2s",
          }}
        />
        {/* bottom corner accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: CUT + 2,
            height: 1,
            background: "var(--accent)",
            transform: `rotate(-45deg)`,
            transformOrigin: "bottom right",
            opacity: hovered ? 1 : 0,
            transition: "opacity .2s",
          }}
        />
      </div>
    </div>
  );
}
