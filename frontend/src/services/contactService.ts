import type { ContactForm, ContactResponse } from '@/types/Contact';
import api from './api';

const useMock = !import.meta.env.VITE_API_URL;

export const sendContactMessage = async (data: ContactForm): Promise<ContactResponse> => {
  if (useMock) {
    // Simula delay de rede em desenvolvimento
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { message: 'Mensagem recebida com sucesso!' };
  }
  const response = await api.post<ContactResponse>('/contact', data);
  return response.data;
};
