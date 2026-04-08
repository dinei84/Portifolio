import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Projects } from './Projects';
import { mockProjects } from '@/mocks/projects';
import { getProjects } from '@/services/projectService';

vi.mock('@/services/projectService', () => ({
  getProjects: vi.fn(),
}));

const mockedGetProjects = vi.mocked(getProjects);

const renderProjects = () => render(<MemoryRouter><Projects /></MemoryRouter>);

describe('Projects', () => {
  beforeEach(() => {
    mockedGetProjects.mockReset();
  });

  it('should render page heading', async () => {
    mockedGetProjects.mockResolvedValue(mockProjects);
    renderProjects();
    expect(await screen.findByRole('heading', { name: /meus projetos/i })).toBeInTheDocument();
  });

  it('should render project cards from service data', async () => {
    mockedGetProjects.mockResolvedValue(mockProjects);
    renderProjects();

    expect(await screen.findByText('App de Tarefas')).toBeInTheDocument();
    expect(screen.getByText('E-commerce')).toBeInTheDocument();
    expect(screen.getByText(mockProjects[4].title)).toBeInTheDocument();
  });

  it('should render coming soon card', async () => {
    mockedGetProjects.mockResolvedValue(mockProjects);
    renderProjects();

    expect(await screen.findByText(/em breve/i)).toBeInTheDocument();
  });

  it('should render contact CTA', async () => {
    mockedGetProjects.mockResolvedValue(mockProjects);
    renderProjects();
    expect(await screen.findByRole('link', { name: /contato/i })).toBeInTheDocument();
  });

  it('should render loading state while fetching projects', () => {
    mockedGetProjects.mockImplementation(() => new Promise(() => {}));
    renderProjects();

    expect(screen.getByText(/carregando projetos/i)).toBeInTheDocument();
  });

  it('should render error state when service fails', async () => {
    mockedGetProjects.mockRejectedValue(new Error('boom'));
    renderProjects();

    expect(await screen.findByText(/nao foi possivel carregar os projetos/i)).toBeInTheDocument();
  });
});
