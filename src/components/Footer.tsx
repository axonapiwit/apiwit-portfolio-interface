"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border-line px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2">
        <span className="font-mono text-xs text-text-dim">{t("endOfFile")}</span>
        <span className="font-mono text-[11px] text-text-dim/50">
          {t("copyright")}
        </span>
      </div>
    </footer>
  );
}
