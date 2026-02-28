"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { clsx } from "clsx";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { Download } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import CyberButton from "./CyberButton";

const NAV_KEYS = ["about", "projects", "experience", "contact"] as const;

const GLITCH_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface NavbarProps {
  visible?: boolean;
}

export default function Navbar({ visible = true }: NavbarProps) {
  const t = useTranslations("nav");
  const navItems = NAV_KEYS.map((key) => ({ label: t(key), href: `#${key}` }));
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuOpen = useRef(false);
  const [, forceRender] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const setOpen = useCallback((val: boolean) => {
    menuOpen.current = val;
    forceRender((n) => n + 1);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_KEYS.map((k) => k);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const openMenu = useCallback(() => {
    if (menuOpen.current) return;
    tlRef.current?.kill();
    setOpen(true);

    const panel = panelRef.current!;
    const backdrop = backdropRef.current!;
    const wrapper = wrapperRef.current!;
    const items = itemsRef.current.filter(Boolean) as HTMLButtonElement[];

    wrapper.style.visibility = "visible";
    wrapper.style.pointerEvents = "auto";

    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.fromTo(
      backdrop,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" },
      0,
    );
    tl.fromTo(
      panel,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
      0.05,
    );

    items.forEach((item, i) => {
      const fullText = item.dataset.label ?? "";
      item.textContent = "";
      const startTime = 0.15 + i * 0.08;

      tl.to(
        {},
        {
          duration: 0.3,
          onUpdate() {
            const p = this.progress();
            const settled = Math.floor(p * fullText.length);
            let result = "";
            for (let c = 0; c < fullText.length; c++) {
              if (c < settled) result += fullText[c];
              else if (c === settled)
                result +=
                  GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            }
            item.textContent = result;
          },
          onComplete() {
            item.textContent = fullText;
          },
        },
        startTime,
      );
    });
  }, [setOpen]);

  const closeMenu = useCallback(() => {
    if (!menuOpen.current) return;
    tlRef.current?.kill();

    const panel = panelRef.current!;
    const backdrop = backdropRef.current!;
    const wrapper = wrapperRef.current!;

    const tl = gsap.timeline({
      onComplete() {
        wrapper.style.visibility = "hidden";
        wrapper.style.pointerEvents = "none";
        setOpen(false);
      },
    });
    tlRef.current = tl;

    tl.to(panel, { opacity: 0, y: -12, duration: 0.25, ease: "power2.in" }, 0);
    tl.to(backdrop, { opacity: 0, duration: 0.25, ease: "power2.in" }, 0.05);
  }, [setOpen]);

  const toggle = useCallback(() => {
    if (menuOpen.current) closeMenu();
    else openMenu();
  }, [openMenu, closeMenu]);

  const scrollTo = useCallback(
    (href: string) => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      closeMenu();
    },
    [closeMenu],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeMenu]);

  useEffect(() => {
    document.body.style.overflow = menuOpen.current ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  });

  return (
    <>
      <nav
        ref={navRef}
        className={clsx(
          "fixed top-0 left-0 z-50 flex h-14 w-full items-center justify-between px-6 transition-all duration-300 md:h-16 md:px-12",
          scrolled
            ? // FIXME: border-b border-border-line bg-black/80 backdrop-blur-md
              "bg-black/80 backdrop-blur-md shadow-[0_1px_0_rgba(255,45,45,0.08)]"
            : "bg-transparent",
          !visible && "pointer-events-none opacity-0",
        )}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-sans text-base font-semibold tracking-wider text-text-primary uppercase transition-colors hover:text-accent"
        >
          APIWIT.EXE
        </button>

        <div className="flex items-center gap-3">
          <CyberButton
            variant="ghost"
            size="sm"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="hidden md:inline-flex"
            data-cursor="link"
          >
            <Download size={14} strokeWidth={1.5} />
            {t("resume")}
          </CyberButton>
          <LanguageSwitcher />
          <button
            onClick={toggle}
            className="relative z-60 flex h-8 w-8 flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={clsx(
                "h-px w-5 bg-text-primary transition-all duration-300",
                menuOpen.current && "translate-y-[3.5px] rotate-45",
              )}
            />
            <span
              className={clsx(
                "h-px w-5 bg-text-primary transition-all duration-300",
                menuOpen.current && "-translate-y-[3.5px] -rotate-45",
              )}
            />
          </button>
        </div>
      </nav>

      {/* Modal — always in DOM, visibility toggled by GSAP */}
      <div
        ref={wrapperRef}
        className="invisible pointer-events-none fixed inset-0 z-55"
      >
        <div
          ref={backdropRef}
          className="absolute inset-0 bg-black/70 opacity-0 backdrop-blur-sm"
          onClick={closeMenu}
        />

        <div className="pointer-events-none absolute top-14 right-4 md:top-16 md:right-10">
          <div
            ref={panelRef}
            className="cyber-clip pointer-events-auto relative w-72 bg-accent/20 p-px opacity-0 will-change-transform md:w-80"
          >
            <div className="cyber-clip relative flex flex-col gap-6 bg-bg-primary/97 px-8 py-10 md:px-10 md:py-12">
              <button
                onClick={closeMenu}
                className="absolute top-4 right-8 text-text-secondary transition-colors hover:text-accent"
                aria-label="Close menu"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M4 4l12 12M16 4L4 16" />
                </svg>
              </button>

              {navItems.map((item, i) => (
                <button
                  key={item.href}
                  ref={(el) => {
                    itemsRef.current[i] = el;
                  }}
                  data-label={item.label}
                  onClick={() => scrollTo(item.href)}
                  className={clsx(
                    "text-left font-sans text-lg font-medium tracking-wide uppercase transition-colors md:text-xl",
                    activeSection === item.href.slice(1)
                      ? "text-accent"
                      : "text-text-primary hover:text-accent",
                  )}
                >
                  <span className="mr-2 text-text-dim">&gt;</span>
                  <span>{item.label}</span>
                </button>
              ))}

              <div className="mt-2 flex border-t border-white/8 pt-6">
                <CyberButton
                  variant="primary"
                  size="sm"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex-1 text-center [&>span]:justify-center"
                  data-cursor="link"
                >
                  <Download size={14} strokeWidth={1.5} />
                  {t("resume")}
                </CyberButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
