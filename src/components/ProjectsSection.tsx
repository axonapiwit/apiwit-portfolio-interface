"use client";

import { useRef } from "react";
import { PROJECTS } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import useScrollReveal from "@/hooks/useScrollReveal";

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, [
    {
      target: () => gridRef.current?.children,
      stagger: 0.1,
      from: { opacity: 0, y: 40 },
      to: { opacity: 1, y: 0, duration: 0.5 },
    },
  ]);

  return (
    <section id="projects" ref={sectionRef} className="relative w-full px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <p className="font-mono text-xs tracking-widest text-accent uppercase">
          &gt; PROJECTS
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-kanit)] text-3xl font-semibold text-text-primary md:text-5xl">
          Selected Works
        </h2>

        <div ref={gridRef} className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
