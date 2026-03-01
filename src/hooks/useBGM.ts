"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSoundEnabled } from "./useSoundFX";

const BGM_SRC = "/audio/the-mountain-cyberpunk.mp3";
const BGM_VOLUME = 0.1;

export function useBGM() {
  const enabled = useSoundEnabled();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) return;
    const audio = new Audio(BGM_SRC);
    audio.loop = true;
    audio.volume = BGM_VOLUME;
    audio.preload = "auto";
    audio.addEventListener("play", () => setPlaying(true));
    audio.addEventListener("pause", () => setPlaying(false));
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (enabled) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [enabled]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, []);

  return { playing, toggle };
}
