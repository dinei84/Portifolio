import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('should render signature text', () => {
    render(<Footer />);
    expect(screen.getByText(/feito com/i)).toBeInTheDocument();
  });

  it('should render GitHub link', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
  });

  it('should render LinkedIn link', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
  });

  it('should render Email link', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /email/i })).toBeInTheDocument();
  });

  it('should render copyright year', () => {
    render(<Footer />);
    expect(screen.getByText(/2026/i)).toBeInTheDocument();
  });
});
