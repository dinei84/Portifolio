import type { Skill } from '@/types/Skill';
import { mockSkills } from '@/mocks/skills';
import api from './api';

const useMock = !import.meta.env.VITE_API_URL;

export const getSkills = async (): Promise<Skill[]> => {
  if (useMock) return mockSkills;
  const response = await api.get<Skill[]>('/skills');
  return response.data;
};
