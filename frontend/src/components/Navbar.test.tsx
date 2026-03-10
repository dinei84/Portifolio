import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from './Navbar';

const renderNavbar = () =>
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

describe('Navbar', () => {
  it('should render logo text', () => {
    renderNavbar();
    expect(screen.getByText('DEV')).toBeInTheDocument();
    expect(screen.getByText('PIXEL')).toBeInTheDocument();
  });

  it('should render all navigation links', () => {
    renderNavbar();
    // Links aparecem duplicados: desktop nav + mobile menu
    expect(screen.getAllByRole('link', { name: /home/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: /sobre/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: /projetos/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: /contato/i }).length).toBeGreaterThanOrEqual(1);
  });

  it('should have correct hrefs for nav links', () => {
    renderNavbar();
    expect(screen.getAllByRole('link', { name: /home/i })[0]).toHaveAttribute('href', '/');
    expect(screen.getAllByRole('link', { name: /sobre/i })[0]).toHaveAttribute('href', '/sobre');
    expect(screen.getAllByRole('link', { name: /projetos/i })[0]).toHaveAttribute('href', '/projetos');
    expect(screen.getAllByRole('link', { name: /contato/i })[0]).toHaveAttribute('href', '/contato');
  });

  it('should toggle mobile menu when hamburger button is clicked', async () => {
    const user = userEvent.setup();
    renderNavbar();
    const menuButton = screen.getByRole('button', { name: /menu/i });
    const mobileMenu = screen.getByTestId('mobile-menu');
    expect(mobileMenu).toHaveClass('hidden');
    await user.click(menuButton);
    expect(mobileMenu).not.toHaveClass('hidden');
  });
});
