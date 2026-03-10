import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/types/Project';

const mockProject: Project = {
  id: '1',
  title: 'App de Tarefas',
  description: 'Um app de gerenciamento de tarefas.',
  githubUrl: 'https://github.com/test/tasks',
  demoUrl: 'https://tasks-demo.vercel.app',
  technologies: ['React', 'Node.js'],
};

describe('ProjectCard', () => {
  it('should render project title', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('App de Tarefas')).toBeInTheDocument();
  });

  it('should render project description', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Um app de gerenciamento de tarefas.')).toBeInTheDocument();
  });

  it('should render all technology badges', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('should render GitHub link', () => {
    render(<ProjectCard project={mockProject} />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test/tasks');
  });

  it('should render Demo link when demoUrl is provided', () => {
    render(<ProjectCard project={mockProject} />);
    const demoLink = screen.getByRole('link', { name: /demo/i });
    expect(demoLink).toHaveAttribute('href', 'https://tasks-demo.vercel.app');
  });

  it('should not render Demo link when demoUrl is not provided', () => {
    const projectWithoutDemo: Project = { ...mockProject, demoUrl: undefined };
    render(<ProjectCard project={projectWithoutDemo} />);
    expect(screen.queryByRole('link', { name: /demo/i })).not.toBeInTheDocument();
  });
});
