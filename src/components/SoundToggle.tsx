"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useToggleSound, useSoundFX } from "@/hooks/useSoundFX";
import { useBGM } from "@/hooks/useBGM";

export default function SoundToggle() {
  const t = useTranslations("sound");
  const toggleSound = useToggleSound();
  const play = useSoundFX();
  const { playing, toggle: toggleBGM } = useBGM();

  const handleClick = () => {
    if (!playing) play("click", true);
    toggleSound();
    toggleBGM();
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-[100] flex h-10 w-10 items-center justify-center border border-border-line bg-bg-primary/80 text-text-dim backdrop-blur-sm transition-colors hover:border-border-accent hover:text-accent"
      aria-label={playing ? t("mute") : t("enable")}
      title={playing ? t("on") : t("off")}
    >
      {playing ? (
        <Volume2 size={16} strokeWidth={1.5} />
      ) : (
        <VolumeX size={16} strokeWidth={1.5} />
      )}
    </button>
  );
}
