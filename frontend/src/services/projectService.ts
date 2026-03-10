import type { Project } from '@/types/Project';
import { mockProjects } from '@/mocks/projects';
import api from './api';

// Quando VITE_API_URL não está definido, usa os dados mock
const useMock = !import.meta.env.VITE_API_URL;

export const getProjects = async (): Promise<Project[]> => {
  if (useMock) return mockProjects;
  const response = await api.get<Project[]>('/projects');
  return response.data;
};

export const getFeaturedProjects = async (): Promise<Project[]> => {
  if (useMock) return mockProjects.filter((p) => p.isFeatured);
  const response = await api.get<Project[]>('/projects/featured');
  return response.data;
};

export const getInteractiveProjects = async (): Promise<Project[]> => {
  if (useMock) return mockProjects.filter((p) => p.isInteractive);
  const response = await api.get<Project[]>('/projects/interactive');
  return response.data;
};
