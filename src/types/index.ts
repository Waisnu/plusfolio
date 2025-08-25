// Core Types
export interface Technology {
  name: string;
  description: string;
}

export interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

export interface NavigationLink {
  href: string;
  label: string;
}

// Component Props
export interface FooterData {
  logo: React.ReactNode;
  brandName: string;
  socialLinks: Array<{
    icon: React.ReactNode;
    href: string;
    label: string;
  }>;
  mainLinks: NavigationLink[];
  legalLinks: NavigationLink[];
  copyright: {
    text: string;
    license?: string;
  };
}

// Form Types
export interface FormState {
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string;
}

// WebGL Types
export interface WebGLRefs {
  scene: any | null; // THREE.Scene
  camera: any | null; // THREE.OrthographicCamera  
  renderer: any | null; // THREE.WebGLRenderer
  mesh: any | null; // THREE.Mesh
  uniforms: any;
  animationId: number | null;
}

// Animation Types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: string;
}

export interface MotionProps {
  initial?: object;
  animate?: object;
  whileInView?: object;
  transition?: AnimationConfig;
  viewport?: {
    once: boolean;
    margin?: string;
  };
}