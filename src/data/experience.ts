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
    year: "2024.07",
    role: "Frontend Developer",
    company: "Maxion Tech",
    description: "Full-time frontend developer based in Bangkok (Hybrid). Building modern web applications with cutting-edge frontend technologies.",
    tags: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    status: "active",
  },
  {
    id: "exp-2",
    year: "2023.05",
    role: "Frontend Developer",
    company: "CIRCLE A CO., LTD.",
    description: "Full-time frontend developer in Chiang Mai. Developing UIs with modern frameworks, building custom components, responsive designs, and code review.",
    tags: ["React", "TypeScript", "TailwindCSS", "MUI"],
    status: "completed",
  },
  {
    id: "exp-3",
    year: "2023.02",
    role: "Unity Developer",
    company: "KK VENTURE COMPANY LIMITED",
    description: "Implemented metaverse 3D game for Web 3.0.",
    tags: ["Unity", "C#", "Metaverse", "Web3"],
    status: "completed",
  },
  {
    id: "exp-4",
    year: "2022.04",
    role: "Unity Developer (Internship)",
    company: "OneDee.ai",
    description: "Developed interactive applications using Unity during 6-month internship in Chiang Mai.",
    tags: ["Unity", "C#"],
    status: "completed",
  },
  {
    id: "exp-5",
    year: "2021.04",
    role: "Frontend Developer (Internship)",
    company: "OneDee.ai",
    description: "Implemented web client during internship period.",
    tags: ["React", "TypeScript"],
    status: "completed",
  },
];
