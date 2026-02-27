import { clsx } from "clsx";

interface HudFrameProps {
  children: React.ReactNode;
  className?: string;
}

export default function HudFrame({ children, className }: HudFrameProps) {
  return (
    <div className={clsx("group relative", className)}>
      <Corner position="top-left" />
      <Corner position="top-right" />
      <Corner position="bottom-left" />
      <Corner position="bottom-right" />
      <div className="border border-border-accent p-1">{children}</div>
    </div>
  );
}

function Corner({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const base = "absolute h-3 w-3 border-accent";
  const map = {
    "top-left": "-top-px -left-px border-t-2 border-l-2",
    "top-right": "-top-px -right-px border-t-2 border-r-2",
    "bottom-left": "-bottom-px -left-px border-b-2 border-l-2",
    "bottom-right": "-bottom-px -right-px border-b-2 border-r-2",
  };
  return <span className={`${base} ${map[position]}`} />;
}
