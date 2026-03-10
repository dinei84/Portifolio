export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-pixel-dark text-white py-6" style={{ borderTop: '6px double var(--color-pixel-primary)' }}>
      <div className="container mx-auto px-4 text-center">
        <p className="font-pixel text-sm">Feito com ❤️ e muito café pixelado</p>

        <div className="flex justify-center space-x-6 mt-4">
          <a
            href="https://github.com/dinei84"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-pixel-accent hover:text-pixel-primary transition-colors font-pixel text-xs"
          >
            GH
          </a>
          <a
            href="https://linkedin.com/in/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-pixel-accent hover:text-pixel-primary transition-colors font-pixel text-xs"
          >
            IN
          </a>
          <a
            href="mailto:email@exemplo.com"
            aria-label="Email"
            className="text-pixel-accent hover:text-pixel-primary transition-colors font-pixel text-xs"
          >
            @
          </a>
        </div>

        <p className="text-xs mt-4" style={{ color: 'rgba(247,255,247,0.7)' }}>
          &copy; {year} — Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}
