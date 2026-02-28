"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSoundEnabled, useToggleSound, useSoundFX } from "@/hooks/useSoundFX";

export default function SoundToggle() {
  const t = useTranslations("sound");
  const enabled = useSoundEnabled();
  const toggle = useToggleSound();
  const play = useSoundFX();

  return (
    <button
      onClick={() => {
        toggle();
        if (!enabled) play("click");
      }}
      className="fixed bottom-6 right-6 z-[100] flex h-10 w-10 items-center justify-center border border-border-line bg-bg-primary/80 text-text-dim backdrop-blur-sm transition-colors hover:border-border-accent hover:text-accent"
      aria-label={enabled ? t("mute") : t("enable")}
      title={enabled ? t("on") : t("off")}
    >
      {enabled ? (
        <Volume2 size={16} strokeWidth={1.5} />
      ) : (
        <VolumeX size={16} strokeWidth={1.5} />
      )}
    </button>
  );
}
