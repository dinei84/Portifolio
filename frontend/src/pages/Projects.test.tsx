import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Projects } from './Projects';

const renderProjects = () => render(<MemoryRouter><Projects /></MemoryRouter>);

describe('Projects', () => {
  it('should render page heading', () => {
    renderProjects();
    expect(screen.getByRole('heading', { name: /meus projetos/i })).toBeInTheDocument();
  });

  it('should render project cards from mock data', () => {
    renderProjects();
    expect(screen.getByText('App de Tarefas')).toBeInTheDocument();
    expect(screen.getByText('E-commerce')).toBeInTheDocument();
    expect(screen.getByText('Jogo da Memória')).toBeInTheDocument();
  });

  it('should render coming soon card', () => {
    renderProjects();
    expect(screen.getByText(/em breve/i)).toBeInTheDocument();
  });

  it('should render contact CTA', () => {
    renderProjects();
    expect(screen.getByRole('link', { name: /contato/i })).toBeInTheDocument();
  });
});
