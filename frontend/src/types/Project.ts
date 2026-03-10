export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  githubUrl: string;
  demoUrl?: string;
  technologies: string[];
  isFeatured?: boolean;
  isInteractive?: boolean;
}
