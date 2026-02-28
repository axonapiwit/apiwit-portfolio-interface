"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { EXPERIENCES } from "@/data/experience";
import useScrollReveal from "@/hooks/useScrollReveal";

export default function ExperienceSection() {
  const t = useTranslations("experience");
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, [
    {
      target: () => listRef.current?.children,
      stagger: 0.15,
      from: { opacity: 0, x: -30 },
      to: { opacity: 1, x: 0, duration: 0.5 },
    },
  ]);

  return (
    <section id="experience" ref={sectionRef} className="relative w-full px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto w-full max-w-4xl">
        <p className="font-mono text-xs tracking-widest text-accent uppercase">
          &gt; {t("label")}
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-kanit)] text-3xl font-semibold text-text-primary md:text-5xl">
          {t("title")}
        </h2>

        <div ref={listRef} className="mt-12 border-l border-white/10 pl-8 md:pl-12">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="group relative pb-12 last:pb-0">
              <span className="absolute -left-8 top-0 h-3 w-3 -translate-x-1/2 border-2 border-accent bg-bg-primary transition-colors group-hover:bg-accent md:-left-12" />

              <div className="font-mono text-sm">
                <span className="text-accent">[{exp.year}]</span>
                <span className="text-text-dim"> &gt; EXEC </span>
                <span className="text-text-primary">role=&quot;{t(`items.${exp.id}.role`)}&quot;</span>
                <span className="text-text-dim"> --at=</span>
                <span className="text-text-primary">&quot;{t(`items.${exp.id}.company`)}&quot;</span>
              </div>

              <div className="mt-2 pl-4 font-mono text-xs leading-relaxed text-text-secondary md:pl-8">
                <div>
                  <span className="text-text-dim">status: </span>
                  <span className={exp.status === "active" ? "text-accent" : "text-text-secondary"}>
                    {t(exp.status === "active" ? "statusActive" : "statusCompleted")}
                  </span>
                </div>
                <div className="mt-0.5 text-text-dim">{t(`items.${exp.id}.description`)}</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] tracking-wide text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
