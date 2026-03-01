"use client";

import { useEffect } from "react";
import { useSoundFX } from "@/hooks/useSoundFX";

type SoundType = "click" | "hover" | "success" | "error" | "type" | "tab";
const SOUND_TYPES: SoundType[] = ["click", "hover", "success", "error", "type", "tab"];

function isSoundType(v: string | null): v is SoundType {
  return v != null && SOUND_TYPES.includes(v as SoundType);
}

export default function SoundDelegate() {
  const play = useSoundFX();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element)?.closest?.("[data-sound]");
      if (!el) return;
      const type = (el.getAttribute("data-sound") || "click").toLowerCase();
      if (isSoundType(type)) play(type);
    };

    const onMouseOver = (e: MouseEvent) => {
      const el = (e.target as Element)?.closest?.("[data-sound-hover]");
      if (!el) return;
      const related = e.relatedTarget as Node | null;
      if (related && el.contains(related)) return;
      play("hover");
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("mouseover", onMouseOver, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("mouseover", onMouseOver, true);
    };
  }, [play]);

  return null;
}
