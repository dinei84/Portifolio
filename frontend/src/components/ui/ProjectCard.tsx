import type { Project } from '@/types/Project';
import { TechBadge } from './TechBadge';

interface ProjectCardProps {
  project: Project;
}

const cardColors = [
  'bg-pixel-primary',
  'bg-pixel-accent',
  'bg-pixel-secondary',
  'bg-pixel-dark',
];

export function ProjectCard({ project }: ProjectCardProps) {
  const colorIndex = parseInt(project.id, 10) % cardColors.length;
  const bgColor = cardColors[colorIndex] ?? 'bg-pixel-primary';

  return (
    <div className="pixel-card group flex flex-col">
      {/* Imagem / placeholder */}
      <div className={`${bgColor} h-48 mb-4 flex items-center justify-center overflow-hidden`}>
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={`Screenshot do projeto ${project.title}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div
            className="text-white font-pixel text-center p-4 text-xs group-hover:scale-110 transition-transform duration-300"
            aria-label={`Screenshot do projeto ${project.title}`}
          >
            {project.title.toUpperCase()}
            <br />
            SCREENSHOT
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col flex-1">
        <h3 className="font-pixel text-base mb-2 text-pixel-primary">{project.title}</h3>
        <p className="mb-4 text-sm flex-1">{project.description}</p>

        {/* Badges de tecnologia */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>

        {/* Links */}
        <div className="flex space-x-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pixel-primary hover:text-pixel-dark transition-colors font-pixel text-xs"
          >
            GitHub
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pixel-primary hover:text-pixel-dark transition-colors font-pixel text-xs"
            >
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
