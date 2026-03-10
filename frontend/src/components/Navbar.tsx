import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: '/',         label: 'Home' },
    { to: '/sobre',    label: 'Sobre' },
    { to: '/projetos', label: 'Projetos' },
    { to: '/contato',  label: 'Contato' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-pixel-light" style={{ borderBottom: '6px double var(--color-pixel-dark)' }}>
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="font-pixel text-xl text-pixel-primary no-underline">
          <span className="animate-pixel-glitch inline-block">DEV</span>
          <span className="text-pixel-dark">PIXEL</span>
        </NavLink>

        {/* Links desktop */}
        <div className="hidden md:flex space-x-4">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Botão hambúrguer */}
        <button
          className="md:hidden px-2 py-1 pixel-border"
          aria-label="menu"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <div className="w-6 h-0.5 bg-pixel-dark mb-1" />
          <div className="w-6 h-0.5 bg-pixel-dark mb-1" />
          <div className="w-6 h-0.5 bg-pixel-dark" />
        </button>
      </nav>

      {/* Menu mobile */}
      <div
        data-testid="mobile-menu"
        className={`${mobileOpen ? '' : 'hidden'} md:hidden bg-pixel-light`}
        style={{ borderTop: '3px dashed var(--color-pixel-dark)' }}
      >
        <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-link block py-2 ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
