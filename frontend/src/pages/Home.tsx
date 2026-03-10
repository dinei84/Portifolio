import { Link } from 'react-router-dom';
import { PixelButton } from '@/components/ui/PixelButton';

export function Home() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <section className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        {/* Avatar pixel */}
        <div className="pixel-border p-1 inline-block mb-6 animate-pixel-float">
          <div className="w-32 h-32 md:w-48 md:h-48 bg-pixel-secondary flex items-center justify-center">
            <div
              className="text-white font-pixel text-xs md:text-sm text-center"
              aria-label="Avatar pixelado do desenvolvedor"
            >
              AVATAR<br />PIXEL
            </div>
          </div>
        </div>

        <h1 className="pixel-heading text-2xl md:text-4xl mb-4">
          Bem-vindo ao meu mundo pixel!
        </h1>

        <p className="text-lg md:text-xl max-w-2xl mb-8">
          Sou um desenvolvedor apaixonado por criar experiências digitais únicas
          e divertidas.
        </p>

        <Link to="/projetos">
          <PixelButton className="animate-pixel-pulse">
            Conheça meus projetos
          </PixelButton>
        </Link>
      </section>
    </main>
  );
}
