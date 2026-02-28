"use client";

import { useTranslations } from "next-intl";
import GlitchText from "./GlitchText";
import Marquee from "./Marquee";
import ScrollIndicator from "./ScrollIndicator";
import CyberpunkBackground from "./CyberpunkBackground";
import CyberButton from "./CyberButton";

interface HeroSectionProps {
  active?: boolean;
}

export default function HeroSection({ active = true }: HeroSectionProps) {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg-primary px-6 md:px-12 lg:px-24"
    >
      <CyberpunkBackground />

      <div className="relative z-10 flex flex-col items-center gap-4 text-center md:items-start md:text-left">
        {active && (
          <>
            <GlitchText
              text="APIWIT"
              as="h1"
              className="font-[family-name:var(--font-kanit)] text-6xl font-semibold text-text-primary md:text-8xl lg:text-[120px] lg:leading-none"
              duration={1.2}
              delay={0.2}
            />
            <p className="animate-[fadeIn_0.5s_ease_0.8s_both] text-lg text-text-secondary md:text-xl">
              {t("subtitle")}
            </p>
            <CyberButton
              href="#projects"
              className="mt-4 animate-[fadeIn_0.5s_ease_1.2s_both]"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t("cta")}
            </CyberButton>
          </>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-16 z-10">
        <Marquee>
          {t("marquee")}
        </Marquee>
      </div>

      <ScrollIndicator />
    </section>
  );
}
