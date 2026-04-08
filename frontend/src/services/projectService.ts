import type { Project } from '@/types/Project';
import api from './api';

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<Project[]>('/projects');
  return response.data;
};

export const getFeaturedProjects = async (): Promise<Project[]> => {
  const projects = await getProjects();
  return projects.filter((project) => project.isFeatured);
};

export const getInteractiveProjects = async (): Promise<Project[]> => {
  const projects = await getProjects();
  return projects.filter((project) => project.isInteractive);
};
