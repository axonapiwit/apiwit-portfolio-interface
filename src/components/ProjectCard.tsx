"use client";

import type { Project } from "@/data/projects";
import { ExternalLink, Github } from "lucide-react";
import CyberButton from "./CyberButton";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div data-cursor="project" className="group relative border border-border-line bg-bg-secondary transition-all duration-300 hover:border-border-accent hover:shadow-[0_0_20px_var(--accent-glow)]">
      <Corner position="top-left" />
      <Corner position="top-right" />
      <Corner position="bottom-left" />
      <Corner position="bottom-right" />

      <div className="relative aspect-video overflow-hidden bg-bg-elevated">
        <div className="flex h-full items-center justify-center font-mono text-xs text-text-dim">
          {project.thumbnail.split("/").pop()?.replace(".png", "").toUpperCase()}
        </div>
        <div className="absolute inset-0 bg-bg-primary/60 transition-opacity duration-300 group-hover:opacity-0" />
      </div>

      <div className="p-5">
        <h3 className="text-base font-semibold text-text-primary">{project.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-text-secondary line-clamp-2">
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] tracking-wide text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex gap-3">
          {project.liveUrl && (
            <CyberButton
              variant="primary"
              size="sm"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={12} strokeWidth={1.5} />
              LIVE
            </CyberButton>
          )}
          {project.codeUrl && (
            <CyberButton
              variant="ghost"
              size="sm"
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={12} strokeWidth={1.5} />
              CODE
            </CyberButton>
          )}
        </div>
      </div>
    </div>
  );
}

function Corner({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const base = "pointer-events-none absolute h-3 w-3 border-accent transition-opacity duration-300 opacity-0 group-hover:opacity-100";
  const map = {
    "top-left": "-top-px -left-px border-t-2 border-l-2",
    "top-right": "-top-px -right-px border-t-2 border-r-2",
    "bottom-left": "-bottom-px -left-px border-b-2 border-l-2",
    "bottom-right": "-bottom-px -right-px border-b-2 border-r-2",
  };
  return <span className={`${base} ${map[position]}`} />;
}
