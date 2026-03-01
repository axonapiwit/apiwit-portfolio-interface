"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Github, Linkedin, Mail } from "lucide-react";
import CyberButton from "./CyberButton";
import useScrollReveal from "@/hooks/useScrollReveal";
import { useSoundFX } from "@/hooks/useSoundFX";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const SOCIALS = [
  { label: "GITHUB", href: "https://github.com/axonapiwit", icon: Github },
  { label: "LINKEDIN", href: "https://linkedin.com/in/apiwit", icon: Linkedin },
  { label: "EMAIL", href: "mailto:axon.apiwit@gmail.com", icon: Mail },
] as const;

export default function ContactSection() {
  const t = useTranslations("contact");
  const play = useSoundFX();
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  useScrollReveal(sectionRef, [
    {
      target: () => formRef.current?.querySelectorAll(".form-row"),
      stagger: 0.1,
      from: { opacity: 0, y: 20 },
      to: { opacity: 1, y: 0 },
    },
  ]);

  const onSubmit = async (data: FormData) => {
    setSending(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      play("success");
      toast.success(t("successToast"));
      reset();
    } catch {
      play("error");
      toast.error(t("errorToast"));
    } finally {
      setSending(false);
    }
  };

  const onError = () => {
    play("error");
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full border-t border-border-line px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto w-full max-w-4xl">
        <p className="font-mono text-xs tracking-widest text-accent uppercase">
          &gt; {t("label")}
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-kanit)] text-3xl font-semibold text-text-primary md:text-5xl">
          {t("title")}
        </h2>

        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit, onError)}
          className="mt-12 space-y-6"
        >
          <div className="form-row">
            <label className="mb-1 block font-mono text-xs text-text-dim">&gt; {t("nameLabel")}</label>
            <input
              {...register("name", { required: true })}
              className="w-full border-b border-white/10 bg-transparent py-3 text-text-primary caret-accent outline-none transition-colors focus:border-accent"
              placeholder={t("namePlaceholder")}
            />
            {errors.name && <span className="mt-1 block font-mono text-xs text-accent">{t("required")}</span>}
          </div>

          <div className="form-row">
            <label className="mb-1 block font-mono text-xs text-text-dim">&gt; {t("emailLabel")}</label>
            <input
              type="email"
              {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
              className="w-full border-b border-white/10 bg-transparent py-3 text-text-primary caret-accent outline-none transition-colors focus:border-accent"
              placeholder={t("emailPlaceholder")}
            />
            {errors.email && <span className="mt-1 block font-mono text-xs text-accent">{t("emailInvalid")}</span>}
          </div>

          <div className="form-row">
            <label className="mb-1 block font-mono text-xs text-text-dim">&gt; {t("messageLabel")}</label>
            <textarea
              {...register("message", { required: true })}
              rows={4}
              className="w-full resize-none border-b border-white/10 bg-transparent py-3 text-text-primary caret-accent outline-none transition-colors focus:border-accent"
              placeholder={t("messagePlaceholder")}
            />
            {errors.message && <span className="mt-1 block font-mono text-xs text-accent">{t("required")}</span>}
          </div>

          <div className="form-row pt-2">
            <CyberButton
              type="submit"
              variant="primary"
              disabled={sending}
              className="disabled:opacity-50"
            >
              {sending ? (
                <span>{t("sending")}<span className="animate-pulse">_</span></span>
              ) : (
                t("submit")
              )}
            </CyberButton>
          </div>
        </form>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-6">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-sound="click"
              className="flex items-center gap-2 font-mono text-sm text-text-secondary transition-colors hover:text-accent"
            >
              <Icon size={16} strokeWidth={1.5} />
              &gt; {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
