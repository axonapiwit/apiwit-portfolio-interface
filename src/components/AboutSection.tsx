"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import HudFrame from "./HudFrame";
import GlitchImage from "./GlitchImage";
import useScrollReveal from "@/hooks/useScrollReveal";

const TECH_STACK = [
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "React",
  "Next.js",
  "Vue",
  "Tailwind CSS",
  "SCSS",
  "GSAP",
  "Framer Motion",
  "Git",
  "Figma",
  "VS Code",
];

export default function AboutSection() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, [
    {
      target: () => avatarRef.current,
      from: { opacity: 0, scale: 0.95 },
      to: { opacity: 1, scale: 1 },
    },
    {
      target: () => bioRef.current,
      from: { opacity: 0, y: 30 },
      to: { opacity: 1, y: 0 },
      delay: 0.15,
    },
    {
      target: () => tagsRef.current?.children,
      stagger: 0.04,
      from: { opacity: 0, y: 10 },
      to: { opacity: 1, y: 0 },
      delay: 0.3,
    },
  ]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="font-mono text-xs tracking-widest text-accent uppercase">
          &gt; {t("label")}
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-kanit)] text-3xl font-semibold text-text-primary md:text-5xl">
          {t("title")}
        </h2>

        <div className="mt-12 grid gap-12 md:grid-cols-5">
          <div ref={avatarRef} className="md:col-span-2">
            <HudFrame>
              <GlitchImage src="/images/gf.webp" alt="Avatar" />
            </HudFrame>
          </div>

          <div className="md:col-span-3">
            <div
              ref={bioRef}
              className="space-y-4 text-base leading-relaxed text-text-secondary"
            >
              <p>{t("bio1")}</p>
              <p>{t("bio2")}</p>
            </div>

            <div className="mt-8">
              <span className="font-mono text-xs tracking-widest text-text-dim">
                {t("techLabel")}
              </span>
              <div ref={tagsRef} className="mt-3 flex flex-wrap gap-2">
                {TECH_STACK.map((tech) => (
                  <span
                    key={tech}
                    className="border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-wide text-white/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
