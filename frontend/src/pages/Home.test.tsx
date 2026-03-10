import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Home } from './Home';

const renderHome = () => render(<MemoryRouter><Home /></MemoryRouter>);

describe('Home', () => {
  it('should render welcome heading', () => {
    renderHome();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('should render tagline text', () => {
    renderHome();
    expect(screen.getByText(/desenvolvedor/i)).toBeInTheDocument();
  });

  it('should render CTA link to projects page', () => {
    renderHome();
    const ctaLink = screen.getByRole('link', { name: /projetos/i });
    expect(ctaLink).toHaveAttribute('href', '/projetos');
  });
});
