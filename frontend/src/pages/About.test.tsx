import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { About } from './About';

const renderAbout = () => render(<MemoryRouter><About /></MemoryRouter>);

describe('About', () => {
  it('should render page heading', () => {
    renderAbout();
    expect(screen.getByRole('heading', { name: /sobre mim/i })).toBeInTheDocument();
  });

  it('should render journey section', () => {
    renderAbout();
    expect(screen.getByRole('heading', { name: /minha jornada/i })).toBeInTheDocument();
  });

  it('should render skills section heading', () => {
    renderAbout();
    expect(screen.getByText(/minhas habilidades/i)).toBeInTheDocument();
  });

  it('should render at least one skill bar', () => {
    renderAbout();
    const bars = screen.getAllByRole('progressbar');
    expect(bars.length).toBeGreaterThan(0);
  });

  it('should render timeline section', () => {
    renderAbout();
    expect(screen.getByText(/minha linha do tempo/i)).toBeInTheDocument();
  });
});
