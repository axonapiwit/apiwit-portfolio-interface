export interface Experience {
  id: string;
  year: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
  status: "active" | "completed";
}

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    year: "2024.01",
    role: "Senior Frontend Developer",
    company: "Tech Company",
    description: "Leading frontend architecture and building design system for enterprise products.",
    tags: ["React", "Next.js", "TypeScript"],
    status: "active",
  },
  {
    id: "exp-2",
    year: "2022.06",
    role: "Frontend Developer",
    company: "Digital Agency",
    description: "Developed interactive web experiences and creative campaigns for global brands.",
    tags: ["Vue", "Nuxt", "GSAP"],
    status: "completed",
  },
  {
    id: "exp-3",
    year: "2021.01",
    role: "Junior Developer",
    company: "Startup Inc.",
    description: "Built responsive web applications and integrated REST APIs for SaaS platform.",
    tags: ["React", "SCSS", "REST API"],
    status: "completed",
  },
];
