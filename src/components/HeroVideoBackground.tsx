"use client";

export default function HeroVideoBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero-bg.mp4"
      />
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.85) 100%)",
        }}
      />
    </div>
  );
}
