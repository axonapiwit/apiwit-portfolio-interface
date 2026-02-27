import { clsx } from "clsx";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export default function Section({ id, children, className, fullHeight }: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        "relative w-full px-6 md:px-12",
        fullHeight && "min-h-screen",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
