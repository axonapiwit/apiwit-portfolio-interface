"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";
import { clsx } from "clsx";

const LOCALES = [
  { code: "en", label: "EN" },
  { code: "th", label: "TH" },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchLocale = useCallback(
    (code: string) => {
      if (code === locale) return;
      document.cookie = `NEXT_LOCALE=${code};path=/;max-age=31536000`;
      startTransition(() => router.refresh());
    },
    [locale, router],
  );

  return (
    <div
      className={clsx(
        "flex items-center gap-px border border-white/10 bg-white/5 font-mono text-[11px] tracking-wider transition-opacity",
        isPending && "pointer-events-none opacity-50",
      )}
    >
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          data-sound="click"
          onClick={() => switchLocale(code)}
          className={clsx(
            "px-2 py-1 transition-colors",
            locale === code
              ? "bg-accent/20 text-accent"
              : "text-text-dim hover:text-text-primary",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
