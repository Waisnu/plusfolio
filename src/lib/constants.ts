// Application Constants
export const APP_CONFIG = {
  name: "PlusFolio",
  description: "AI-Powered Website Analysis",
  tagline: "Get comprehensive design feedback and insights for your website in just 60 seconds with our AI-powered analysis tool.",
  keywords: "website analysis, design feedback, AI analysis, web development, UX audit",
} as const;

// Animation Constants  
export const ANIMATION_DURATIONS = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  infinite: 30,
  infiniteHover: 60,
} as const;

// UI Constants
export const UI_CONFIG = {
  maxUsers: "50+",
  responseTime: "24h", 
  freeAccess: "100%",
  loadTime: {
    progress: 200,
    complete: 500,
  }
} as const;

// Social Links Configuration
export const SOCIAL_LINKS = [
  {
    icon: "Twitter",
    href: "#",
    label: "Twitter"
  },
  {
    icon: "Github", 
    href: "#",
    label: "GitHub"
  },
  {
    icon: "Linkedin",
    href: "#", 
    label: "LinkedIn"
  }
] as const;

// Navigation Links
export const MAIN_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#docs", label: "Documentation" },
  { href: "#blog", label: "Blog" }
] as const;

export const LEGAL_LINKS = [
  { href: "#privacy", label: "Privacy Policy" },
  { href: "#terms", label: "Terms of Service" },
  { href: "#contact", label: "Contact" }
] as const;

// Technology Configurations
export const TECHNOLOGY_ICONS: string[] = [
  "typescript",
  "javascript", 
  "react",
  "nextdotjs",
  "vuedotjs",
  "angular",
  "svelte",
  "nodejs",
  "express",
  "nestjs",
  "django",
  "flask",
  "laravel",
  "ruby",
  "wordpress",
  "shopify",
  "tailwindcss",
  "sass",
  "mongodb",
  "postgresql",
  "mysql",
  "redis",
  "docker",
  "kubernetes",
  "aws",
  "vercel",
  "netlify",
  "firebase",
  "supabase",
  "github",
  "git"
];

export const TECHNOLOGIES = [
  { name: "React", description: "Frontend Library" },
  { name: "Next.js", description: "Full-Stack Framework" },
  { name: "TypeScript", description: "Type-Safe JavaScript" },
  { name: "Vue.js", description: "Progressive Framework" },
  { name: "Angular", description: "Enterprise Platform" },
  { name: "Svelte", description: "Compiled Framework" },
  { name: "Node.js", description: "JavaScript Runtime" },
  { name: "Express", description: "Web Framework" },
  { name: "NestJS", description: "Enterprise Node.js" },
  { name: "Django", description: "Python Framework" },
  { name: "Laravel", description: "PHP Framework" },
  { name: "WordPress", description: "CMS Platform" },
  { name: "Shopify", description: "E-commerce Platform" },
  { name: "Tailwind CSS", description: "Utility-First CSS" },
  { name: "MongoDB", description: "NoSQL Database" },
  { name: "PostgreSQL", description: "SQL Database" },
  { name: "Docker", description: "Containerization" },
  { name: "Kubernetes", description: "Orchestration" },
  { name: "AWS", description: "Cloud Platform" },
  { name: "Vercel", description: "Deployment Platform" },
  { name: "Firebase", description: "Backend Service" },
  { name: "Supabase", description: "Open Source Backend" }
] as const;

// WebGL Shader Configuration
export const SHADER_CONFIG = {
  uniforms: {
    xScale: 1.0,
    yScale: 0.5,
    distortion: 0.05,
  },
  animation: {
    timeIncrement: 0.01,
    initDelay: 100,
  }
} as const;