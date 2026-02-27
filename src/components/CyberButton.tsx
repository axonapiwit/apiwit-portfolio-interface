import {
  type ReactNode,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";

type BaseProps = {
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
  children: ReactNode;
  className?: string;
};

type AsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type AsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type CyberButtonProps = AsAnchor | AsButton;

const OUTER: Record<string, string> = {
  primary:
    "bg-accent/30 hover:bg-accent/50 hover:shadow-[0_0_20px_var(--accent-glow)]",
  ghost: "bg-white/8 hover:bg-white/20 hover:shadow-[0_0_12px_var(--accent-glow)]",
};

const INNER: Record<string, string> = {
  primary: "text-accent group-hover:bg-accent/10",
  ghost:
    "text-text-primary group-hover:bg-white/5 group-hover:text-accent",
};

const SIZE: Record<string, string> = {
  sm: "px-4 py-1.5 text-xs tracking-wider gap-2",
  md: "px-8 py-3 text-sm tracking-[0.2em] gap-3",
};

const DOT: Record<string, string> = {
  sm: "h-1 w-1",
  md: "h-1.5 w-1.5",
};

export default function CyberButton({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...rest
}: CyberButtonProps) {
  const isLink = "href" in rest && rest.href != null;
  const Tag = isLink ? "a" : "button";
  const clip = size === "sm" ? "cyber-clip-sm" : "cyber-clip";

  return (
    <Tag
      className={`${clip} group relative p-px transition-all duration-300 ${OUTER[variant]} ${className}`}
      {...(rest as Record<string, unknown>)}
    >
      <span
        className={`${clip} flex items-center bg-bg-primary font-medium uppercase transition-all duration-300 ${INNER[variant]} ${SIZE[size]}`}
      >
        <span
          className={`inline-block ${DOT[size]} bg-accent shadow-[0_0_6px_var(--accent)] transition-shadow group-hover:shadow-[0_0_12px_var(--accent)]`}
        />
        {children}
      </span>
    </Tag>
  );
}
