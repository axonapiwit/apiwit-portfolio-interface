export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "portfolio-v2",
    title: "Portfolio V2",
    description: "Personal portfolio with cyberpunk aesthetic, GSAP animations and boot screen sequence.",
    thumbnail: "/projects/portfolio.png",
    tags: ["Next.js", "GSAP", "Tailwind"],
    liveUrl: "#",
    codeUrl: "https://github.com/axonapiwit",
    featured: true,
  },
  {
    id: "ecommerce-dashboard",
    title: "E-Commerce Dashboard",
    description: "Admin dashboard with real-time analytics, order management and inventory tracking.",
    thumbnail: "/projects/dashboard.png",
    tags: ["React", "TypeScript", "Chart.js"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    id: "chat-app",
    title: "Real-time Chat",
    description: "WebSocket-based chat application with typing indicators and message reactions.",
    thumbnail: "/projects/chat.png",
    tags: ["Next.js", "Socket.io", "Prisma"],
    codeUrl: "#",
  },
  {
    id: "design-system",
    title: "Component Library",
    description: "Reusable UI component library with Storybook documentation and accessibility.",
    thumbnail: "/projects/components.png",
    tags: ["React", "Storybook", "SCSS"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    id: "weather-app",
    title: "Weather Visualizer",
    description: "Interactive weather app with map visualization and 7-day forecast.",
    thumbnail: "/projects/weather.png",
    tags: ["Vue", "Mapbox", "API"],
    liveUrl: "#",
  },
  {
    id: "blog-platform",
    title: "Blog Platform",
    description: "MDX-powered blog with syntax highlighting, search and dark mode.",
    thumbnail: "/projects/blog.png",
    tags: ["Next.js", "MDX", "Tailwind"],
    liveUrl: "#",
    codeUrl: "#",
  },
];
