"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

const STORE_KEY = "apiwit-sound";

let listeners: (() => void)[] = [];
function emit() { listeners.forEach((l) => l()); }

function getEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(STORE_KEY) === "on";
}

function subscribe(cb: () => void) {
  listeners.push(cb);
  return () => { listeners = listeners.filter((l) => l !== cb); };
}

export function useSoundEnabled() {
  return useSyncExternalStore(subscribe, getEnabled, () => false);
}

export function useToggleSound() {
  return useCallback(() => {
    const next = !getEnabled();
    sessionStorage.setItem(STORE_KEY, next ? "on" : "off");
    emit();
  }, []);
}

type SoundType = "click" | "hover" | "success" | "error" | "type" | "tab";

const FREQ_MAP: Record<SoundType, { freq: number; dur: number; type: OscillatorType }> = {
  click:   { freq: 800,  dur: 0.04, type: "square" },
  hover:   { freq: 600,  dur: 0.02, type: "sine" },
  success: { freq: 1200, dur: 0.08, type: "sine" },
  error:   { freq: 200,  dur: 0.12, type: "sawtooth" },
  type:    { freq: 1000, dur: 0.02, type: "square" },
  tab:     { freq: 1400, dur: 0.03, type: "sine" },
};

export function useSoundFX() {
  const ctxRef = useRef<AudioContext | null>(null);

  const play = useCallback((type: SoundType, force?: boolean) => {
    if (!force && !getEnabled()) return;
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    const ctx = ctxRef.current;
    const { freq, dur, type: wave } = FREQ_MAP[type];

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = wave;
    osc.frequency.value = freq;
    gain.gain.value = 0.08;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur);
  }, []);

  return play;
}
